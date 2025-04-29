const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Common Oracle installation paths
const commonPaths = [
  'C:\\oracle\\product\\11.2.0\\client_1',
  'C:\\oracle\\product\\12.2.0\\client_1',
  'C:\\oracle\\product\\18.0.0\\client_1',
  'C:\\oracle\\product\\19.0.0\\client_1',
  'C:\\oraclexe\\app\\oracle\\product\\11.2.0\\server',
  'C:\\app\\oracle\\product\\11.2.0\\client_1',
  'C:\\app\\oracle\\product\\12.2.0\\client_1',
  'C:\\app\\oracle\\product\\18.0.0\\client_1',
  'C:\\app\\oracle\\product\\19.0.0\\client_1',
  process.env.ORACLE_HOME
].filter(Boolean);

// Check if a path exists and contains Oracle client files
function checkOracleClientPath(path) {
  if (!path) return false;
  
  try {
    if (!fs.existsSync(path)) return false;
    
    // Check for common Oracle client files
    const hasOci = fs.existsSync(`${path}\\bin\\oci.dll`);
    const hasOraocci = fs.existsSync(`${path}\\bin\\oraocci11.dll`) || 
                      fs.existsSync(`${path}\\bin\\oraocci12.dll`) ||
                      fs.existsSync(`${path}\\bin\\oraocci18.dll`) ||
                      fs.existsSync(`${path}\\bin\\oraocci19.dll`);
    
    return hasOci || hasOraocci;
  } catch (err) {
    console.error(`Error checking path ${path}:`, err.message);
    return false;
  }
}

// Check PATH environment variable for Oracle client
function checkPathEnv() {
  const pathEnv = process.env.PATH || '';
  const paths = pathEnv.split(';');
  
  for (const p of paths) {
    if (p.toLowerCase().includes('oracle') && checkOracleClientPath(p)) {
      return p;
    }
  }
  
  return null;
}

// Check if Oracle services are running
function checkOracleServices() {
  try {
    const output = execSync('sc query state= all | findstr "OracleService"', { encoding: 'utf8' });
    return output.trim().length > 0;
  } catch (err) {
    return false;
  }
}

// Main function to check Oracle client installation
function checkOracleClient() {
  console.log('Checking Oracle client installation...');
  
  // Check ORACLE_HOME environment variable
  const oracleHome = process.env.ORACLE_HOME;
  if (oracleHome) {
    console.log(`ORACLE_HOME is set to: ${oracleHome}`);
    if (checkOracleClientPath(oracleHome)) {
      console.log('✅ Oracle client files found in ORACLE_HOME');
    } else {
      console.log('❌ Oracle client files not found in ORACLE_HOME');
    }
  } else {
    console.log('❌ ORACLE_HOME environment variable is not set');
  }
  
  // Check PATH environment variable
  const oracleInPath = checkPathEnv();
  if (oracleInPath) {
    console.log(`✅ Oracle client found in PATH: ${oracleInPath}`);
  } else {
    console.log('❌ Oracle client not found in PATH');
  }
  
  // Check common installation paths
  let foundInCommonPath = false;
  for (const p of commonPaths) {
    if (p && checkOracleClientPath(p)) {
      console.log(`✅ Oracle client found in: ${p}`);
      foundInCommonPath = true;
    }
  }
  
  if (!foundInCommonPath) {
    console.log('❌ Oracle client not found in common installation paths');
  }
  
  // Check if Oracle services are running
  const servicesRunning = checkOracleServices();
  if (servicesRunning) {
    console.log('✅ Oracle services are running');
  } else {
    console.log('❌ Oracle services not detected or not running');
  }
  
  // Summary
  if ((oracleHome && checkOracleClientPath(oracleHome)) || oracleInPath || foundInCommonPath) {
    console.log('\n✅ Oracle client appears to be installed');
    return true;
  } else {
    console.log('\n❌ Oracle client does not appear to be properly installed');
    console.log('\nYou may need to:');
    console.log('1. Install Oracle Instant Client from: https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html');
    console.log('2. Add the Instant Client directory to your PATH environment variable');
    console.log('3. Set the ORACLE_HOME environment variable');
    return false;
  }
}

// Run the check
checkOracleClient();
