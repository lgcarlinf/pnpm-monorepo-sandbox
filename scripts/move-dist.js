const fs = require('fs');
const path = require('path');

const NEXT_APP_DIST = './apps/next-app/dist';
const QWIK_APP_DIST = './apps/qwik-app/dist';
const ROOT_DIST = './dist';

function moveDirectory(source, destination) {
  try {

    if (fs.existsSync(destination)) {
      fs.rmSync(destination, { recursive: true, force: true });
      console.log(`✅ Eliminado directorio existente: ${destination}`);
    }

    if (!fs.existsSync(source)) {
      console.log(`⚠️  Directorio no encontrado: ${source}`);
      return false;
    }

    const parentDir = path.dirname(destination);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }

    fs.renameSync(source, destination);

    return true;
  } catch (error) {
    console.error(`❌ Error moviendo ${source} a ${destination}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🚀 Iniciando proceso de preparación para despliegue...\n');

  console.log('📦 Paso 1: Moviendo dist de Next.js a la raíz...');
  const nextMoved = moveDirectory(NEXT_APP_DIST, ROOT_DIST);

  if (!nextMoved) {
    console.error('❌ No se pudo mover el dist de Next.js. Abortando...');
    process.exit(1);
  }

  console.log('\n📦 Paso 2: Moviendo dist de Qwik dentro del dist de Next.js...');
  const qwikDestination = path.join(ROOT_DIST, 'qwik');
  const qwikMoved = moveDirectory(QWIK_APP_DIST, qwikDestination);

  if (!qwikMoved) {
    console.log('⚠️  No se pudo mover el dist de Qwik (puede que no exista)');
  }

  console.log('\n✨ Proceso de preparación completado!');
  console.log('📁 Estructura final:');
  console.log('   ./dist/ (Next.js)');
  console.log('   ./dist/qwik/ (Qwik)');
}

main();
