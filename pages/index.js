import FacetRow from "components/FacetRow";
import {
    ENGRAVING_TYPE_NEGATIVE,
    ENGRAVING_TYPE_POSITIVE,
    FACET_STATE_FAILURE,
    FACET_STATE_SUCCESS,
    NUM_ENGRAVING_POSITIVE,
    NUM_SLOTS_DEFAULT,
    NUM_SLOTS_MAX,
    NUM_SLOTS_MIN,
    ODDS_DEFAULT,
    ODDS_DELTA,
    ODDS_MAX_PERCENT,
    ODDS_MIN_PERCENT,
} from "lib/consts";
import { randomizeSuccess } from "lib/math";
import { deepCopySlots, initializeDefaultSlots } from "lib/slots";
import { useState } from "react";

export default function Home() {
    const [numSlots, setNumSlots] = useState(NUM_SLOTS_DEFAULT);
    const [slots, setSlots] = useState(initializeDefaultSlots());
    const [currentOdds, setCurrentOdds] = useState(ODDS_DEFAULT);

    const handleChangeNumSlots = (e) => {
        const value = parseInt(e.target.value, 10);
        const newSlots = deepCopySlots(slots);
        if (value > numSlots) {
            newSlots = newSlots.map((slotRow) => ({
                ...slotRow,
                slots: slotRow.slots.concat(new Array(value - numSlots).fill(null)),
            }));
        } else if (value < numSlots) {
            newSlots = newSlots.map((slotRow) => ({
                ...slotRow,
                slots: slotRow.slots.slice(0, value),
            }));
        }
        setNumSlots(value);
        setSlots(newSlots);
        return;
    };

    const handleFacet = (value, index, type) => {
        if (value === FACET_STATE_SUCCESS) handleSuccessFacet(index);
        if (value === FACET_STATE_FAILURE) handleFailFacet(index);
        if (value === "random") {
            randomizeSuccess(currentOdds) ? handleSuccessFacet(index) : handleFailFacet(index);
        }
    };

    const handleSuccessFacet = (rowIndex) => {
        console.log("SUCCESS");
        const newSlots = deepCopySlots(slots);
        const newRow = setRowFacet(newSlots[rowIndex].slots, true);
        if (newRow) {
            newSlots[rowIndex] = { ...newSlots[rowIndex], slots: newRow };
            setSlots(newSlots);
            if (currentOdds > ODDS_MIN_PERCENT) setCurrentOdds(currentOdds - ODDS_DELTA);
        }
    };

    const handleFailFacet = (rowIndex) => {
        console.log("FAILURE");
        const newSlots = deepCopySlots(slots);
        const newRow = setRowFacet(newSlots[rowIndex].slots, false);
        if (newRow) {
            newSlots[rowIndex] = { ...newSlots[rowIndex], slots: newRow };
            setSlots(newSlots);
            if (currentOdds < ODDS_MAX_PERCENT) setCurrentOdds(currentOdds + ODDS_DELTA);
        }
    };

    const setRowFacet = (row, isSuccess) => {
        const newRow = [...row];
        const index = newRow.indexOf(null);
        if (index !== -1) {
            newRow[index] = isSuccess;
            return [...newRow];
        }
        return null;
    };

    const positiveSlots = slots.filter((s) => s.type === ENGRAVING_TYPE_POSITIVE);
    const negativeSlots = slots.filter((s) => s.type === ENGRAVING_TYPE_NEGATIVE);

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
            Success Rate: {currentOdds}
            {positiveSlots.map((row, i) => (
                <FacetRow
                    slots={row.slots}
                    type={row.type}
                    key={i}
                    onFacet={(value) => handleFacet(value, i, row.type)}
                />
            ))}
            Chance of Cracking: {currentOdds}
            {negativeSlots.map((row, i) => (
                <FacetRow
                    slots={row.slots}
                    type={row.type}
                    key={i}
                    onFacet={(value) => handleFacet(value, i + NUM_ENGRAVING_POSITIVE, row.type)}
                />
            ))}
        </main>
    );
}
