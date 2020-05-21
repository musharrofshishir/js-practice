var app = new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startgame: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function(){
            var damage = this.healthvalue(10,3);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: "Player hits monster for "+ damage
            });
            if( this.check(this.playerHealth, this.monsterHealth)){
                return;
            }                        
            this.monsterAttack();
            
        },
        sAttack: function(){

            var damage = this.healthvalue(15,8);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: "Player uses speacial attack and hits monster for "+ damage
            });
            if( this.check(this.playerHealth, this.monsterHealth)){
                return;
            }                        
            this.monsterAttack();
            

            // var damage = this.healthvalue(15,8);
            // this.monsterHealth -= damage;
            // damage = this.healthvalue(12,5)
            // this.playerHealth -= damage;
            // this.check(this.playerHealth, this.monsterHealth);
        },
        heal: function(){
            if(this.playerHealth <= 90){
                this.playerHealth += 10;
                this.turns.unshift({
                    isPlayer: false,
                    text: "Player heals for "+ 10
                });
            }
            else{
                this.playerHealth = 100;
            }
            this.monsterAttack();
            
        },
        giveup: function(){
            this.turns.unshift({
                isPlayer: true,
                text: "The player has given up, monster wons "
            });
            this.gameIsRunning = false;

        },
        monsterAttack: function(){
            var damage = this.healthvalue(12,5);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: "Monster hits player for "+ damage
            });
            this.check(this.playerHealth, this.monsterHealth);
        },
        healthvalue: function(max,min){
            return Math.max(Math.floor(Math.random()*max)+1,min);
        },
        check: function(phealth, mhealth){
            if( phealth<= 0 ){
                if( confirm("You have lost, New game?") ){
                    this.startgame();
                }
                else{
                    this.gameIsRunning = false;
                }
                return true; 
            }
            else if( mhealth <= 0 ){                
                if( confirm("You won! New game?") ){
                    this.startgame();
                }
                else{
                    this.gameIsRunning = false;
                }
                return true; 
            }
            else{
                return false;
            }
        }
    }
})