function updateStats() {
  fetch('/api/stats')
    .then(response => response.json())
    .then(stats => {
      // Update character info
      document.getElementById('characterName').textContent = 'magZeFierce';
      document.getElementById('characterLevel').textContent = `Level ${stats.level} ${stats.class}`;
      
      // Update health bar
      const healthBar = document.getElementById('healthBar');
      const healthText = document.getElementById('healthText');
      const healthPercent = (stats.health.current / stats.health.max) * 100;
      healthBar.style.width = `${healthPercent}%`;
      healthText.textContent = `${stats.health.current} / ${stats.health.max}`;
      
      // Update experience bar
      const experienceBar = document.getElementById('experienceBar');
      const experienceText = document.getElementById('experienceText');
      const experiencePercent = (stats.experience.current / stats.experience.max) * 100;
      experienceBar.style.width = `${experiencePercent}%`;
      experienceText.textContent = `${stats.experience.current} / ${stats.experience.max}`;
      
      // Update mana bar
      const manaBar = document.getElementById('manaBar');
      const manaText = document.getElementById('manaText');
      const manaPercent = (stats.mana.current / stats.mana.max) * 100;
      manaBar.style.width = `${manaPercent}%`;
      manaText.textContent = `${stats.mana.current} / ${stats.mana.max}`;

      // Update currency
      document.getElementById('goldText').textContent = Math.floor(stats.gold);
    })
    .catch(error => {
      console.error('Error fetching stats:', error);
    });
}

// Update stats immediately and then every 30 seconds
updateStats();
setInterval(updateStats, 30000);