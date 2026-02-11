// Adiciona um monte de partículas e coisas desnecessárias pro texto. 
const h2 = document.querySelector('.flaunty');
for (let i = 0; i < 25; i++) {
  const spark = document.createElement('span');
  spark.classList.add('firework');
  spark.style.setProperty('--x', `${(Math.random() - 0.5) * 600}px`);
  spark.style.setProperty('--y', `${(Math.random() - 0.5) * 600}px`);
  spark.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;
  spark.style.animationDelay = `${Math.random() * 0.25}s`;
  h2.appendChild(spark);
}