class rankingScene extends Phaser.Scene{
    constructor(){
        super("rankingScene");
    }

    init(data){
        this.English = data.english;
        this.am = data.am;
    }

    preload(){
        this.load.image('rankES', 'assets/screens/Puntuaciones.png');
        this.load.image('rankEN', 'assets/screens/PuntuacionesIngles.png');
        this.load.bitmapFont('agency', 'assets/font/agency_0.png', 'assets/font/agency.xml');
    }

    create(){
        if (this.English){
            this.add.sprite(960, 540, 'rankEN');
        } else {
            this.add.sprite(960, 540, 'rankES');
        }
        var bText = this.add.text(125,125,"Atrás",{font : "48px"}).setInteractive().on("pointerup",()=>{
            this.scene.start("menuScene", {english: this.English, am: this.am});
        });
        bText.setAlpha(0.01);

        //Posiciones
        this.add.bitmapText(425, 250, 'agency', '1ST').setTint(0x968e46);
        this.add.bitmapText(425, 410, 'agency', '2ND').setTint(0x968e46);
        this.add.bitmapText(425, 590, 'agency', '3RD').setTint(0x968e46);
        this.add.bitmapText(425, 750, 'agency', '4TH').setTint(0xca2bc4);
        this.add.bitmapText(425, 910, 'agency', '5TH').setTint(0xca2bc4);

        this.add.bitmapText(1100, 250, 'agency', '6TH').setTint(0xca2bc4);
        this.add.bitmapText(1100, 415, 'agency', '7TH').setTint(0xca2bc4);
        this.add.bitmapText(1100, 590, 'agency', '8TH').setTint(0xca2bc4);
        this.add.bitmapText(1100, 750, 'agency', '9TH').setTint(0xca2bc4);
        this.add.bitmapText(1100, 910, 'agency', '10TH').setTint(0xca2bc4);


        var rank = localStorage.getItem('rank');    //Se recupera el array de puntuaciones
        rank = JSON.parse(rank);

        if(rank == null)            //si no existe, se crea
            rank = new Array();


        var score = new Array('---', '---', '---', '---', '---', '---', '---', '---', '---', '---');

        var i;
        for(i = 0; i<rank.length; i++){
            score[i] = rank[i].toString();
        }

        this.add.bitmapText(625, 250, 'agency', score[0]).setTint(0x968e46);
        this.add.bitmapText(625, 410, 'agency', score[1]).setTint(0x968e46);
        this.add.bitmapText(625, 590, 'agency', score[2]).setTint(0x968e46);
        this.add.bitmapText(625, 750, 'agency', score[3]).setTint(0xca2bc4);
        this.add.bitmapText(625, 910, 'agency', score[4]).setTint(0xca2bc4);

        this.add.bitmapText(1300, 250, 'agency', score[5]).setTint(0xca2bc4);
        this.add.bitmapText(1300, 415, 'agency', score[6]).setTint(0xca2bc4);
        this.add.bitmapText(1300, 590, 'agency', score[7]).setTint(0xca2bc4);
        this.add.bitmapText(1300, 750, 'agency', score[8]).setTint(0xca2bc4);
        this.add.bitmapText(1300, 910, 'agency', score[9]).setTint(0xca2bc4);
    }

    update(){

    }
}