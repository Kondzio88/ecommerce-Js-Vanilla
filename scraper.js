const fs = require('fs');

// TUTAJ WKLEJ SWÓJ KLUCZ!
const KEY = '7f8e0f85fdmsh91ee2d59b2f1210p1ac765jsnbb083c2e7f04'; 

// Funkcja usypiająca skrypt, żeby ominąć blokady (Rate Limit)
const czekaj = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Rozbudowana lista kategorii - Męskie i Damskie!
const kategorieMenu = [
    // --- 💻 ELECTRONICS ---
    { id: 'desktop', query: 'desktop+computer' },
    { id: 'laptop', query: 'laptop' },
    { id: 'camera', query: 'digital+camera' },
    { id: 'tablet', query: 'tablet' },
    { id: 'headphone', query: 'headphones' },
    { id: 'smartWatch', query: 'smart+watch' },
    { id: 'smartTv', query: 'smart+tv' },
    { id: 'keyboard', query: 'computer+keyboard' },
    { id: 'mouse', query: 'computer+mouse' },
    { id: 'microphone', query: 'microphone' },

    // --- 👔 MEN'S ---
    { id: 'mensFormal', query: 'men+formal+wear' },
    { id: 'mensCasual', query: 'men+casual+wear' },
    { id: 'mensSports', query: 'men+sports+wear' },
    { id: 'mensJacket', query: 'men+jacket' },
    { id: 'mensSunglasses', query: 'men+sunglasses' },
    { id: 'mensShirt', query: 'men+shirt' },
    { id: 'mensShortsJeans', query: 'men+shorts+jeans' },
    { id: 'mensSafetyShoes', query: 'men+safety+shoes' },
    { id: 'mensWallet', query: 'men+wallet' },

    // --- 👗 WOMEN'S ---
    { id: 'womensFormal', query: 'women+formal+wear' },
    { id: 'womensCasual', query: 'women+casual+wear' },
    { id: 'womensPerfume', query: 'women+perfume' },
    { id: 'womensCosmetics', query: 'cosmetics' },
    { id: 'womensBags', query: 'women+bag' },
    { id: 'womensDress', query: 'women+dress+frock' },
    { id: 'womensEarrings', query: 'women+earrings' },
    { id: 'womensNecklace', query: 'women+necklace' },
    { id: 'makeupKit', query: 'makeup+kit' },

    // --- 💍 JEWELRY ---
    { id: 'jewelryEarrings', query: 'jewelry+earrings' },
    { id: 'coupleRings', query: 'couple+rings' },
    { id: 'jewelryNecklace', query: 'jewelry+necklace' },
    { id: 'bracelets', query: 'bracelets' },

    // --- 🌸 PERFUME (Osobny dział) ---
    { id: 'clothesPerfume', query: 'clothes+perfume' },
    { id: 'deodorant', query: 'deodorant' },
    { id: 'flowerFragrance', query: 'flower+fragrance+perfume' },
    { id: 'airFreshener', query: 'air+freshener' }
];

async function zbudujBazeDlaMenu() {
    console.log("🚀 Odpalam bota-giganta! Zbieram wszystkie 36 kategorii z Twojego HTML-a...");
    console.log("⏱️ Uwaga: To potrwa około 2-3 minut. Idź zrób sobie kawę!\n");
    
    let gotowaBaza = {};

    for (const kategoria of kategorieMenu) {
        console.log(`⏳ [${Object.keys(gotowaBaza).length + 1}/${kategorieMenu.length}] Pobieram: ${kategoria.id}...`);

        const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${kategoria.query}&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': KEY,
                'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const daneZApi = await response.json();

            // Zabezpieczenie przed limitami
            if (daneZApi.message) {
                console.log(`❌ Odrzucono (${kategoria.id}):`, daneZApi.message);
                console.log("⚠️ Prawdopodobnie wyczerpałeś darmowy limit zapytań w RapidAPI. Przerywam pętlę i zapisuję to, co udało się zebrać do tej pory.");
                break; // Urywa pętlę, żeby nie spamować serwera zablokowanym kluczem
            }

            if (daneZApi.data && daneZApi.data.products) {
                const produkty = daneZApi.data.products;
                gotowaBaza[kategoria.id] = produkty;
                console.log(`✅ Sukces! Zebrano ${produkty.length} produktów.`);
            } else {
                console.log(`⚠️ Brak wyników dla '${kategoria.id}'.`);
            }

            // Usypiamy skrypt na 3 sekundy, żeby Amazon nas nie zablokował za spam!
            await czekaj(3000); 

        } catch (error) {
            console.error(`❌ Błąd sieci przy ${kategoria.id}:`, error.message);
        }
    }

    console.log("\n💾 Zapisuję całą zebraną strukturę do db.json...");
    fs.writeFileSync('db.json', JSON.stringify(gotowaBaza, null, 2));
    console.log("🎉 BAZA GOTOWA! Twój plik db.json to teraz prawdziwy magazyn e-commerce!");
}

zbudujBazeDlaMenu();