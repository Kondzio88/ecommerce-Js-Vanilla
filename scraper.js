const fs = require('fs');

const kategorieMenu = [
    'desktop', 'laptop', 'camera', 'tablet', 'headphone', 'smartWatch', 'smartTv', 'keyboard', 'mouse', 'microphone',
    'mensFormal', 'mensCasual', 'mensSports', 'mensJacket', 'mensSunglasses', 'mensShirt', 'mensShortsJeans', 'mensSafetyShoes', 'mensWallet',
    'womensFormal', 'womensCasual', 'womensPerfume', 'womensCosmetics', 'womensBags', 'womensDress', 'womensEarrings', 'womensNecklace', 'makeupKit',
    'jewelryEarrings', 'coupleRings', 'jewelryNecklace', 'bracelets',
    'clothesPerfume', 'deodorant', 'flowerFragrance', 'airFreshener'
];

console.log("🛠️ Uruchamiam profesjonalny Generator Bazy z Placehold.co...");

const gotowaBaza = {};

kategorieMenu.forEach(kategoria => {
    const produkty = [];
    
    // Zmieniamy np. 'mensShirt' na 'MENS SHIRT', żeby ładnie wyglądało na obrazku
    const czystaNazwa = kategoria.replace(/([A-Z])/g, ' $1').trim().toUpperCase();

    // Generujemy po 8 produktów dla każdej kategorii
    for (let i = 1; i <= 8; i++) {
        
        // Szykujemy tekst na obrazek (np. "MENS SHIRT 1") i zamieniamy spacje na format url (%20)
        const tekstNaZdjeciu = encodeURIComponent(`${czystaNazwa} \n MODEL ${i}`);

        produkty.push({
            asin: `MOCK_${kategoria.toUpperCase()}_00${i}`,
            product_title: `Testowy produkt: ${czystaNazwa} - Model ${i}`,
            product_price: "$" + (Math.random() * 290 + 10).toFixed(2),
            
            // MAGIA: Profesjonalny placeholder! Jasnoszare tło, ciemnoszary tekst.
            product_photo: `https://placehold.co/300x400/f3f4f6/1f2937?text=${tekstNaZdjeciu}`,
            
            product_star_rating: (Math.random() * 2 + 3).toFixed(1)
        });
    }
    
    gotowaBaza[kategoria] = produkty;
});

// Zapisujemy wszystko do db.json
try {
    fs.writeFileSync('db.json', JSON.stringify(gotowaBaza, null, 2));
    console.log(`✅ SUKCES! Wygenerowano ${kategorieMenu.length * 8} idealnie opisanych produktów!`);
} catch (error) {
    console.error("❌ BŁĄD ZAPISU DO PLIKU:", error);
}