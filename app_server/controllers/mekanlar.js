var express = require('express');
var router = express.Router();

/* GET home page. */
const anaSayfa = function(req, res, next) {
    res.render('mekanlar-liste', {
        'baslik': 'Mekan32 | Anasayfa',
        'footer': 'Tarık Kırcalı ',
        'sayfaBaslik': {
            'siteAd': 'Mekan 32',
            'aciklama': 'Isparta Civarındaki Mekanları Keşfedin!'
        },
        'mekanlar': [{
                'ad': 'Starbucks',
                'adres': 'Centrum Garden Avm',
                'puan': 3,
                'imkanlar': ['Dunya Kahveleri', 'Kekler', 'Pastalar'],
                'mesafe': '1km'
            },
            {
                'ad': 'Zeyrek Kafe & Bistro',
                'adres': 'Fatih, 4504/1. Sk., 32200 Isparta Merkez/Isparta',
                'puan': 5,
                'imkanlar': ['Kahve', 'Kekler', 'Pastalar', 'Çay'],
                'mesafe': '1.8km'
            },
            {
                'ad': 'Cafe Güleç',
                'adres': 'Çünür, 32000 Isparta Merkez/Isparta',
                'puan': 5,
                'imkanlar': ['Kahve', 'Kekler', 'Pastalar'],
                'mesafe': '5km'
            },
            {
                'ad': 'Karikatür Bi Kafe Isparta',
                'adres': 'Kutlubey, 1001. Sk. No:6, 32100 Isparta Merkez/Isparta',
                'puan': 3,
                'imkanlar': ['Kekler', 'Filtre Kahveler', 'Yöresel Kahveler'],
                'mesafe': '12km'
            },
            {
                'ad': 'Ada Fırın Cafe&Bistro',
                'adres': 'Ayazmana, Ayazmana Cd. No:61, 32040 Isparta Merkez/Isparta',
                'puan': 3,
                'imkanlar': ['Poğaça Çeşitleri',  'Kahve Çeşitleri', 'çay'],
                'mesafe': '0,9km'
            },
            {
                'ad': 'AYIŞIĞI CAFE &BİSTRO',
                'adres': 'Çünür, 5321. Sk. No :36, 32200 Merkez/Isparta',
                'puan': 2,
                'imkanlar': ['Kahve', 'Çay', 'Pastalar'],
                'mesafe': '1km'
            }
        ]
    });
}

const mekanBilgisi = function(req, res, next) {
    res.render('mekan-detay', {
        'baslik': 'Mekan Bilgisi',
        'footer': 'Tarık Kırcalı ',
        'sayfaBaslik': 'Starbucks',
        'mekanBilgisi': {
            'ad': 'Starbucks',
            'adres': 'Centrum Garden Avm',
            'puan': 3,
            'imkanlar': ['Dunya Kahveleri', 'Kekler', 'Pastalar'],
            'koordinatlar': {
                'enlem': '37.781885',
                'boylam': '30.566034'
            },
            'saatler': [{
                'gunler': 'Pazartesi-Cuma',
                'acilis': '07:00',
                'kapanis': '23:00',
                'kapali': false
            }, {
                'gunler': 'Cumartesi',
                'acilis': '09:00',
                'kapanis': '22:00',
                'kapali': false
            }, {
                'gunler': 'Pazar',
                'kapali': true
            }],
            'yorumlar': [{
                    'yorumYapan': 'Tarık Kırcalı',
                    'puan': 3,
                    'tarih': '27.11.2020',
                    'yorumMetni': 'Kahveler lezzetli.'
                },
                {
                    'yorumYapan': 'Hüseyin Özcan',
                    'puan': 4,
                    'tarih': '27.12.2021',
                    'yorumMetni': 'Hizmet kalitesi seviyesi iyi, pastalar çok güzel...'
                }
            ]
        }
    });
}

const yorumEkle = function(req, res, next) {
    res.render('yorum-ekle', {
        title: 'Yorum Ekle',
        'footer': 'Tarık Kırcalı ',
    });
}


module.exports = {
    anaSayfa,
    mekanBilgisi,
    yorumEkle
}

module.exports.admin = function(req, res, next) {
    res.render('admin', { title: 'Admin' });
};