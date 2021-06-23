var soruKac = 0;
var saniye = 10;
var zaman;
var secim = -1;
var beklemeSure = 3;
var secInterval;
var element;
var a;
var temp = 0;
var dogruCevap = 0;




let sorular = [
    {
        soru: 'Yukarıda yer alan Sivas İlinde bulunan gölün adı nedir?',
        gorsel: '<img src="gokpinar.jpg" height="auto">',
        cevaplar:['Günpınar', 'Gökpınar', 'Mavipınar', 'Canova'],
        secenekSayisi : 4,
        cevap : 2
    },
    {
        soru: 'Yukarıdaki şarkıyı kim seslendirmektedir?',
        gorsel: '<video controls autoplay height="auto"><source src="50cent.mp4" type="video/mp4"></video>',
        cevaplar:['100 cent', '1 Pound', '50 cent', 'Cent'],
        secenekSayisi : 4,
        cevap : 3
    },
    {
        soru: 'Sivasın Simge isimlerinden olan ünlü ozanımız kimdir?',
        gorsel: '<img src="veysel.jpg" height="auto" >',
        cevaplar:['Kıvırcık Ali', 'Aşık Mahsuni', 'Yunus Emre', 'Aşık Veysel'],
        secenekSayisi : 4,
        cevap : 4
    },
    {
        soru: 'Sivasın Simge Yapılarından Olan Divriği Ulu Camiinin Mimarı Kimdir?',
        gorsel: '<img src="divrigi.jpg" height="auto" width="100%">',
        cevaplar:['Ahlatlı Hürrem Şah', 'Mimar Sinan', 'Sivaslı Kuddusi', 'Mimar Nurettin', 'Divriğili Ahmet'],
        secenekSayisi : 5,
        cevap : 1
    },
    {
        soru: '"Sivasta Kış Turizmin de Önemli Bir Yeri Olan Kayak Merkezi Neresidir?',
        gorsel: '<img src="yildizdagi.jpg" height="auto">',
        cevaplar:['Çamlıbel', 'Çamlık', 'Yıldızdağı', 'Kızıldağ', 'Tecer Dağı'],
        secenekSayisi : 5,
        cevap : 3
    }
]

function baslat(){
   
    if(soruKac < sorular.length ){
        document.getElementById("ortaKural").style.display = "none";
        document.getElementById("soruGetir").style.display = "block";
        document.getElementById("soruAciklama").style.display = "block";
        document.getElementById("cevap_nedir").style.display = "block";
        document.getElementById("btnBasla").style.display = "none"; 
        
        const img = sorular[soruKac].gorsel;
        document.getElementById("soruGetir").innerHTML = img;
    
        var soruSayisi = document.getElementById("soruSayisi");
        var soruSayisiArtir = document.getElementById("soruSayisiArtir");
        var soru = document.getElementById("soru");
        soruSayisi.innerText = soruKac + 1;
        soruSayisiArtir.innerText = soruKac + 1;
        soru.innerText = sorular[soruKac].soru;
        document.getElementById("cevap_nedir").innerHTML = "Cevabınızı Aşağıdan Seçiniz...";
    
        
        if(temp != soruKac){
            const cevaplar = document.querySelector("#cevap_alan").children;
            for(var i = 0; i < cevaplar.length; i++){
                 cevaplar[i].classList.remove("dogruCevap","yanlisCevap");
            }
           
        }
         soruYukle();
      
    }
}

function soruYukle(){
    zaman = setInterval(sureBaslat, 1000);
    clearInterval(a);
        for(var j = 0; j < sorular[soruKac].secenekSayisi; j++){
            document.getElementById(j + 1).style.display = "block";
            document.getElementById(j + 1).innerHTML = sorular[soruKac].cevaplar[j];
        }
}



function sureBaslat(){
	if(saniye == 10){
        document.getElementById("gecenSure").innerText =  + saniye;
    }
    else if(saniye >= 0){
        document.getElementById("gecenSure").innerText ='0' + saniye;
    }
    saniye--;
    if(saniye == -1){
        sonrakiSoru();
    }
}

function sonrakiSoru(){
    const cevaplar = document.querySelector("#cevap_alan").children;
    cevaplar[sorular[soruKac].cevap - 1].classList.add("dogruCevap");
    sureDurdur();
    if(beklemeSure > 0){
        beklemeSure--;
        a = setTimeout('sonrakiSoru()', 1000);
    }
    else{
        temp = soruKac;
        soruKac++;
        if(soruKac <= sorular.length - 1){
            sureAyar();
        }
        else{
            oyunSonu();            
        }
        baslat();
    }
}


function sureDurdur(){
    clearInterval(zaman);
}

function kontrol(element){
    this.element = element;
    sureDurdur();
    const cevaplar = document.querySelector("#cevap_alan").children;
    if(element.id == sorular[soruKac].cevap){
        element.classList.add("dogruCevap");
        document.getElementById("cevap_nedir").innerHTML = "Doğru";
        dogruCevap++;
        document.getElementById("dogruCevap").innerHTML = dogruCevap;
        sonrakiSoru();
    }
    else{
        element.classList.add("yanlisCevap");
        document.getElementById("cevap_nedir").innerHTML = "Yanlış";
        sonrakiSoru();
    }
}

function sureAyar(){
    beklemeSure = 3;
    saniye = 10;
}

function oyunSonu(){
			document.getElementById("cevap_alan").style.display = "none";
            document.getElementById("cevap_nedir").style.display = "none";
            document.getElementById("soruGetir").style.display = "none";
            document.getElementById("soruAciklama").innerHTML = "Toplam puan: " + dogruCevap + " / " + soruKac;
            document.getElementById("soruAciklama").style.padding = "30px"
            document.getElementById("btnTekrar").style.display = "block";
            document.getElementById("ortaKural").style.display = "block";
            document.getElementById("ortaKural").innerHTML = '<img src="son.png" width="100%" height="auto">';
            document.getElementById("gecenSure").innerText = "00";
}

function tekrar(){
    window.location.reload();
}
