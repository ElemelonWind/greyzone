import { useState } from 'react';
import Address from '@/components/Address';

export default function Info() {
    const [address, setAddress] = useState('');

    if (!address) {
        return <Address setAddress={setAddress} />;
    }

    return (
        <div className="info-page">
            <h1>Greyzone</h1>
            <p>Politics for Dummies</p>
        </div>
    );
}