import { useState, useEffect } from 'react';
import Address from '@/components/Address';
import Loading from '@/components/Loading';

export default function Info() {
    const [address, setAddress] = useState('3013 Jeannie Anna Court, Herndon, VA 20171-4071, USA');
    const [voterData, setVoterData] = useState([]);

    useEffect(() => {
        if (!address || voterData.length) return;

        const fetchVoterData = async () => {
            console.log('fetching voter data')
            const response = await fetch('/api/reps', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ address })
            });

            const data = await response.json();

            if (response.status !== 200) {
                return;
            }

            setVoterData(data.message);
        }

        fetchVoterData();
    }, [address, voterData]);

    if (!address) {
        return <Address setAddress={setAddress} />;
    }

    if (!voterData.length) {
        return (
            <div className="info-page">
                <Loading />
            </div>
        );
    }

    return (
        <div className="info-page">
            {voterData.map((rep, index) => (
                <div key={index}>
                    <h1>{rep.title}</h1>
                    {rep.officials.map((official, ind) => (
                        <div key={ind}>
                            <h2>{official.name}</h2>
                            <h3>{official.party}</h3>
                            <a href={official.urls[0]}>{official.urls[0]}</a>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}