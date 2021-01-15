var express = require('express');
var router = express.Router();

var request = require('postman-request');


var apiSecenekleri = {
    sunucu: "https://tarikkircali1821012181.herokuapp.com",
 //sunucu: "http://localhost:3000",
    apiYolu: '/api/mekanlar/'
}

/* Local Test: */
/* var apiSecenekleri = {
    sunucu: "http://localhost:3000/",
    apiYolu: 'api/mekanlar/'
} */



var istekSecenekleri;

var footer = 'Tarık Kırcalı';

/* Mesafe Formatlama İşlemi Yapılır. */
var mesafeyiFormatla = function(mesafe) {
  var yeniMesafe, birim;
  if (mesafe > 1000) {
    yeniMesafe = parseFloat(mesafe / 1000).toFixed(2);
        birim = " km";
    } else {
        yeniMesafe = parseFloat(mesafe).toFixed(1);
        birim = "m";
    }
    return yeniMesafe + birim;
}

/* Anasayfayı oluşturan metot. */
var anaSayfaOlustur = function(req, res, cevap, mekanListesi) {
    var mesaj;
    if (!(mekanListesi instanceof Array)) {
        mesaj = "Apı Hatası: Birşeyler Ters Gitti";
        mekanListesi = [];
    } else {
        if (!mekanListesi.length) {
            mesaj = "Civarda (20km Mesafede) herhangi bir mekan bulunamadı.Örnek Mekanlar İçin: ?enlem=37.781885&boylam=30.504944"
        }
    }
    res.render('mekanlar-liste', {
        'baslik': 'Mekan32 | Anasayfa',
        'footer': 'Tarık Kırcalı',
        'sayfaBaslik': {
            'siteAd': 'Mekan 32',
            'aciklama': 'Isparta Civarındaki Mekanları Keşfedin!'
        },
        mekanlar: mekanListesi,
        mesaj: mesaj,
        cevap: cevap,
    });

}

/* Yeni Oluşturulan Metot Api İle Bağlantılı */
const anaSayfa = function(req, res) {
    istekSecenekleri = {
        url: apiSecenekleri.sunucu + apiSecenekleri.apiYolu,
        method: "GET",
        json: {},
        qs: {
            enlem: req.query.enlem,
            boylam: req.query.boylam
        }
    };
    request(istekSecenekleri, function(hata, cevap, mekanlar) {
        var i, gelenMekanlar;
        gelenMekanlar = mekanlar;
        if (!hata && gelenMekanlar.length) {
            for (i = 0; i < gelenMekanlar.length; i++) {
                gelenMekanlar[i].mesafe = mesafeyiFormatla(gelenMekanlar[i].mesafe);
            }
        }
        anaSayfaOlustur(req, res, cevap, gelenMekanlar);
    });
}

/* Yeni Oluşturulan Metot Api İle Bağlantılı */
var detaySayfasiOlustur = function(req, res, mekanDetaylari) {
    res.render('mekan-detay', {
        baslik: mekanDetaylari.ad,
        footer: footer,
        sayfaBaslik: mekanDetaylari.ad,
        mekanBilgisi: mekanDetaylari
    });
}

var hataGoster = function(req, res, durum) {
    var baslik, icerik;
    if (durum == 404) {
        baslik = "404, Sayfa Bulunamadı";
        icerik = "Sayfayı Bulamadık";
    } else {
        baslik = durum + " , Birşeyler ters gitti.";
        icerik = "Ters giden birşeyler var";
    }
    res.status(durum);
    res.render('error', {
        baslik: baslik,
        icerik: icerik
    });
}



/* GET home page. */
/* const anaSayfa = function(req, res, next) {
    res.render('mekanlar-liste', {
        'baslik': 'Mekan32 | Anasayfa',
        'footer': 'Tarık Kırcalı',
        'sayfaBaslik': {
            'siteAd': 'Mekan 32',
            'aciklama': 'Isparta Civarındaki Mekanları Keşfedin!'
        },
        'mekanlar': mekanListesi,
        mesaj:mesaj,
        cevap:cevap,
    });
} */

var mekanBilgisiGetir = function(req, res, callback) {
    var istekSecenekleri;
    istekSecenekleri = {
        url: apiSecenekleri.sunucu + apiSecenekleri.apiYolu + req.params.mekanid,
        method: "GET",
        json: {}
    };
    request(
        istekSecenekleri,
        function(hata, cevap, mekanDetaylari) {
            var gelenMekan = mekanDetaylari;
            if (!hata) {
                gelenMekan.koordinatlar = {
                    enlem: mekanDetaylari.koordinatlar[0],
                    boylam: mekanDetaylari.koordinatlar[1]
                };
                callback(req, res, gelenMekan);
            } else {
                hataGoster(req, res, cevap.statusCode);
            }
        }
    );
}



var mekanBilgisi = function(req, res, callback) {
    istekSecenekleri = {
        url: apiSecenekleri.sunucu + apiSecenekleri.apiYolu + req.params.mekanid,
        method: "GET",
        json: {}
    };
    request(istekSecenekleri, function(hata, cevap, mekanDetaylari) {
        var gelenMekan = mekanDetaylari;
        if (cevap.statusCode == 200) {
            gelenMekan.koordinatlar = {
                enlem: mekanDetaylari.koordinatlar[0],
                boylam: mekanDetaylari.koordinatlar[1]
            };
            detaySayfasiOlustur(req, res, gelenMekan);
        } else {
            hataGoster(req, res, cevap.statusCode);
        }
    });
}

var yorumSayfasiOlustur = function(req, res, mekanBilgisi) {
    res.render('yorum-ekle', {
        baslik: mekanBilgisi.ad + ' Mekanına Yorum Ekle',
        sayfaBaslik: mekanBilgisi.ad + ' Mekanına Yorum Ekle',
        footer: footer,
        hata: req.query.hata
    });
}





const yorumEkle = function(req, res) {
    mekanBilgisiGetir(req, res, function(req, res, cevap) {
        yorumSayfasiOlustur(req, res, cevap);
    })
}

const yorumumuEkle = function(req, res) {
    var istekSecenekleri, gonderilenYorum, mekanid;
    mekanid = req.params.mekanid;
    gonderilenYorum = {
        yorumYapan: req.body.name,
        puan: parseInt(req.body.rating, 10),
        yorumMetni: req.body.review
    };
    istekSecenekleri = {
        url: apiSecenekleri.sunucu + apiSecenekleri.apiYolu + mekanid + '/yorumlar',
        method: "POST",
        json: gonderilenYorum
    };
    if (!gonderilenYorum.yorumYapan || !gonderilenYorum.puan || !gonderilenYorum.yorumMetni) {
        res.redirect('/mekan/' + mekanid + '/yorum/yeni?hata=evet');
    } else {
        request(
            istekSecenekleri,
            function(hata, cevap, body) {

                if (cevap.statusCode === 201) {
                    res.redirect('/mekan/' + mekanid);
                } else if (cevap.statusCode === 400 && body.name && body.name === "ValidationError") {
                    res.redirect('/mekan/' + mekanid + '/yorum/yeni?hata=evet');
                } else {
                    hataGoster(req, res, cevap.statusCode);
                }
            }
        );
    }
}

module.exports = {
    anaSayfa,
    mekanBilgisi,
    yorumEkle,
    yorumumuEkle
}

module.exports.admin = function(req, res, next) {
    res.render('admin', { title: 'Admin' });
};