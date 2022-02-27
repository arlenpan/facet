import Image from "next/image";

// value: true for filled, false for fail, null for unfaceted
export default function FacetSlot({ value }) {
    return (
        <Image src={"/diamond.svg"} alt="Diamond Slot" height={36} width={36} />
    );
}
