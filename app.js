const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
};

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      gameActive: true,
      specialAttackCounter: 0,
      monsterScore: 0,
      playerScore: 0,
      winner: null,
      logMessages: []
    }
  },
  watch: {
    monsterHealth(value) {
      if (value < 0 && this.playerHealth < 0) {
        this.winner = 'Draw';
        value = 0;
        this.gameActive = !this.gameActive;
        this.playerHealth = 0;
      } else if (value < 0) {
        this.winner = 'Player';
        value = 0;
        this.gameActive = !this.gameActive;
        this.playerScore++
      }
    },
    playerHealth(value) {
      if (value < 0 && this.monsterHealth < 0) {
        this.winner = 'Draw';
        value = 0;
        this.gameActive = !this.gameActive;
        this.monsterHealth = 0;
      } else if (value < 0) {
        this.winner = 'Monster';
        value = 0;
        this.gameActive = !this.gameActive;
        this.monsterScore++;
      }
    }
  },
  computed: {
    monsterBarStyles() {
      return {width: this.monsterHealth + '%'};
    },
    playerBarStyles() {
      return {width: this.playerHealth + '%'};
    },
    trackRounds() {
      return this.specialAttackCounter % 3 !== 0;
    }
  },
  methods: {
    startGame() {
      this.monsterHealth = 100,
      this.playerHealth = 100,
      this.gameActive = true,
      this.specialAttackCounter = 0,
      this.winner = null,
      this.logMessages = []
    },
    specialAttack() {
      this.specialAttackCounter++
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      console.log(this.monsterHealth);
      this.addLogMessage('player', 'attack', attackValue);
      this.attackPlayer();
    },
    attackMonster() {
      this.specialAttackCounter++
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      console.log(this.monsterHealth);
      this.addLogMessage('player', 'attack', attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMessage('monster', 'attack', attackValue);
    },
    healPlayer() {
      this.specialAttackCounter++
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue <= 100) {
        this.playerHealth += healValue
      } else {
        this.playerHealth = 100;
      }
      this.addLogMessage('player', 'heal', healValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = 'Monster';
      this.gameActive = false;
    },
    addLogMessage(who, type, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: type,
        actionValue: value
      });
    }
  }
});

app.mount('#game');