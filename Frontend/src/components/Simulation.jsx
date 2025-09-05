import EncodeForm from "./EncodeForm";
import DecodeForm from "./DecodeForm";

export default function Simulation() {
    return (
        <>
            <h1 className=" text-4xl">Simulation</h1>
            <div>
                <div className="flex flex-col gap-4">
                    <EncodeForm />
                    <DecodeForm />
                </div>
            </div>
        </>
    )
}