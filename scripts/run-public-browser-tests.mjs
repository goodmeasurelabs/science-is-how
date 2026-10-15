import {spawn} from 'node:child_process';
const origin='http://127.0.0.1:4188';
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4188','--strictPort'],{stdio:['ignore','pipe','pipe']});
let output='';server.stdout.on('data',d=>output+=d);server.stderr.on('data',d=>output+=d);
try {
 let ready=false;
 for(let attempt=0;attempt<80;attempt++){
  if(server.exitCode!==null)throw Error('Preview exited: '+output);
  try{if((await fetch(origin)).ok){ready=true;break;}}catch{}
  await new Promise(resolve=>setTimeout(resolve,100));
 }
 if(!ready)throw Error('Preview did not become ready: '+output);
 const test=spawn(process.execPath,['tests/public-browser.mjs',origin],{stdio:'inherit'});
 const code=await new Promise((resolve,reject)=>{test.on('error',reject);test.on('exit',resolve)});
 if(code!==0)throw Error('Public browser regression failed: '+code);
} finally {server.kill('SIGTERM');}
