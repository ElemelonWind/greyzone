export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { address } = req.body;

        const response = await fetch(`https://www.googleapis.com/civicinfo/v2/representatives?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&address=${encodeURI(address)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        
        if (response.status !== 200) {
            console.log(response);
            res.status(500).json({ message: 'Error' });
            return;
        }

        const data = await response.json(); 
        
        let reps = [];
        let offices = data.offices;
        let officials = data.officials;

        for (let i = 0; i < offices.length; i++) {
            let office = offices[i];
            let officialIndices = office.officialIndices;

            for (let j = 0; j < officialIndices.length; j++) {
                let official = officials[officialIndices[j]];
                reps.push({
                    title: office.name,
                    name: official.name,
                    party: official.party,
                    url: official.urls[0],
                })
            }
        }

        res.status(200).json({ message: reps });
    }
}