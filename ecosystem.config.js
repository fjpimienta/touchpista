module.exports = {
  apps: [
    {
      name: 'touchpista',
      script: './path/to/your/app.js', // Cambia esto por la ruta a tu archivo de inicio
      instances: 'max',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
