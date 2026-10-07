const te=new TextEncoder(),td=new TextDecoder();
const DB='aegis-vault-v1',STORE='vault',RECORD='primary';
const b64=b=>btoa(String.fromCharCode(...new Uint8Array(b)));
const unb64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
const db=()=>new Promise((ok,no)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>r.result.createObjectStore(STORE);r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)});
async function get(){const d=await db();return new Promise((ok,no)=>{const t=d.transaction(STORE),r=t.objectStore(STORE).get(RECORD);r.onsuccess=()=>ok(r.result||null);r.onerror=()=>no(r.error);t.oncomplete=()=>d.close()})}
async function put(v){const d=await db();return new Promise((ok,no)=>{const t=d.transaction(STORE,'readwrite');t.objectStore(STORE).put(v,RECORD);t.oncomplete=()=>{d.close();ok()};t.onerror=()=>no(t.error)})}
async function derive(password,salt,usage){const material=await crypto.subtle.importKey('raw',te.encode(password),'PBKDF2',false,['deriveKey']);return crypto.subtle.deriveKey({name:'PBKDF2',hash:'SHA-256',salt,iterations:600000},material,{name:'AES-GCM',length:256},false,usage)}
async function encrypt(key,value){const iv=crypto.getRandomValues(new Uint8Array(12));const data=await crypto.subtle.encrypt({name:'AES-GCM',iv},key,te.encode(JSON.stringify(value)));return{iv:b64(iv),data:b64(data)}}
async function decrypt(key,box){const plain=await crypto.subtle.decrypt({name:'AES-GCM',iv:unb64(box.iv)},key,unb64(box.data));return JSON.parse(td.decode(plain))}
export async function vaultExists(){return!!(await get())}
export async function createVault(password,items=[]){const salt=crypto.getRandomValues(new Uint8Array(16));const key=await derive(password,salt,['encrypt','decrypt']);const check=await encrypt(key,{aegis:'vault-check-v1'});const payload=await encrypt(key,items);await put({v:1,kdf:{name:'PBKDF2-SHA256',iterations:600000,salt:b64(salt)},check,payload});return{key,items}}
export async function unlockVault(password){const r=await get();if(!r)throw new Error('Vault is not initialized');const key=await derive(password,unb64(r.kdf.salt),['encrypt','decrypt']);try{const check=await decrypt(key,r.check);if(check.aegis!=='vault-check-v1')throw 0;return{key,items:await decrypt(key,r.payload)}}catch{throw new Error('Incorrect master password')}}
export async function saveVault(key,items){const r=await get();if(!r)throw new Error('Vault is not initialized');r.payload=await encrypt(key,items);await put(r)}
export async function migrateLegacy(key,items){await saveVault(key,items);localStorage.removeItem('aegis-items-v2')}

export async function exportSyncEnvelope(){const r=await get();if(!r)return null;return{version:1,revision:Number(r.revision||0),updatedAt:new Date().toISOString(),ciphertext:b64(te.encode(JSON.stringify({v:r.v,kdf:r.kdf,check:r.check,payload:r.payload})))}}
export async function markSynced(revision){const r=await get();if(r){r.revision=revision;await put(r)}}
export async function importSyncEnvelope(envelope){const remote=JSON.parse(td.decode(unb64(envelope.ciphertext)));await put({...remote,revision:envelope.revision});return true}
