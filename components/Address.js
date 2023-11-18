import { useState } from "react";

export default function Address({ setAddress }) {
    const [formAddress, setFormAddress] = useState("");

    const submit = (e) => {
        e.preventDefault();
        setAddress(formAddress);
    }

    return (
        <div className="address-page">
            <div>
                <p>
                    In order to display the correct information for your area, we need to know your address.
                </p>
                <p>
                    If you are not comfortable sharing your address, you can still use our chat feature!
                </p>
                <form>
                    <input
                    className="w-1/2 px-4 py-3 rounded-lg"
                    type={"address"}
                    name="address"
                    id="address"
                    value={formAddress}
                    onChange={(e) => setFormAddress(e.target.value)}
                    placeholder="Enter Address"
                    />
                    
                    <button
                    className="w-1/2 block transition-colors duration-300 text-white font-semibold rounded-lg
                    px-4 py-3 mt-6"
                    onClick={submit}
                    >
                    SUBMIT
                    </button>
                </form>
            </div>
        </div>
    )
}