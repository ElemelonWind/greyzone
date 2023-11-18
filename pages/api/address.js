export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { formAddress } = req.body;

        // Process a POST request
        const response = await fetch(`https://addressvalidation.googleapis.com/v1:validateAddress?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address: {
                addressLines: [formAddress],
                regionCode: 'US',
                languageCode: 'en'
            } })
        })

        if (response.status !== 200) {
            console.log(response);
            res.status(500).json({ message: 'Address not found' });
            return;
        }

        const data = await response.json();

        if (data.result.verdict.hasUnconfirmedComponents) {
            res.status(500).json({ message: 'Please enter your full address.' });
            return;
        }
        
        if (data.result.metadata.residential) {
            res.status(200).json({ message: data.result.address.formattedAddress });
            return;
        }

        res.status(500).json({ message: 'Not a residential address' });
    }
}