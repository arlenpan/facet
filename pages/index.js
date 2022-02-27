import FacetRow from "components/FacetRow";
import { NUM_SLOTS_DEFAULT, NUM_SLOTS_MAX, NUM_SLOTS_MIN } from "lib/consts";
import { deepCopySlots, initializeDefaultSlots } from "lib/slots";
import { useState } from "react";

export default function Home() {
    const [numSlots, setNumSlots] = useState(NUM_SLOTS_DEFAULT);
    const [slots, setSlots] = useState(initializeDefaultSlots());

    const handleChangeNumSlots = (e) => {
        const value = parseInt(e.target.value, 10);
        const newSlots = deepCopySlots(slots);

        if (value > numSlots) {
            newSlots = newSlots.map((slotRow) => ({
                ...slotRow,
                slots: slotRow.slots.concat(
                    new Array(value - numSlots).fill(null)
                ),
            }));

            setNumSlots(value);
            setSlots(newSlots);
            return;
        }

        if (value < numSlots) {
            newSlots = newSlots.map((slotRow) => ({
                ...slotRow,
                slots: slotRow.slots.slice(0, value),
            }));

            setNumSlots(value);
            setSlots(newSlots);
            return;
        }
    };

    return (
        <main>
            <h3>Lost Ark Ability Stone Faceting Calculator</h3>
            <input
                type="number"
                value={numSlots}
                onChange={handleChangeNumSlots}
                max={NUM_SLOTS_MAX}
                min={NUM_SLOTS_MIN}
            />
            {slots.map((row, i) => (
                <FacetRow slots={row.slots} key={i} />
            ))}
        </main>
    );
}
