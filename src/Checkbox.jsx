import { useState } from 'react';

const Checkbox = ({ response }) => {
    // Utility function to extract children labels from any parent
    const getChildrenLabels = (parent) => Object.keys(parent);

    // State to track parent and child checkboxes' checked status for each parent
    const [parentsChecked, setParentsChecked] = useState(
        response.map(() => false)
    );
    const [childrenChecked, setChildrenChecked] = useState(
        response.map((parent) => getChildrenLabels(parent.parent).map(() => false))
    );

    // Handle parent checkbox change
    const handleParentChange = (parentIndex) => {
        const updatedParentsChecked = [...parentsChecked];
        const checked = !updatedParentsChecked[parentIndex]; // Toggle the state of the parent checkbox
        updatedParentsChecked[parentIndex] = checked;
        setParentsChecked(updatedParentsChecked);

        // Update all children of this parent to match the parent checkbox's state
        const updatedChildrenChecked = [...childrenChecked];
        updatedChildrenChecked[parentIndex] = updatedChildrenChecked[parentIndex].map(() => checked);
        setChildrenChecked(updatedChildrenChecked);
    };

    // Handle individual child checkbox change
    const handleChildChange = (parentIndex, childIndex) => {
        const updatedChildrenChecked = [...childrenChecked];
        updatedChildrenChecked[parentIndex][childIndex] = !updatedChildrenChecked[parentIndex][childIndex];
        setChildrenChecked(updatedChildrenChecked);

        // Update the parent checkbox based on children
        const allChecked = updatedChildrenChecked[parentIndex].every((checked) => checked);
        const noneChecked = updatedChildrenChecked[parentIndex].every((checked) => !checked);
        const updatedParentsChecked = [...parentsChecked];
        if (allChecked) {
            updatedParentsChecked[parentIndex] = true;
        } else if (noneChecked) {
            updatedParentsChecked[parentIndex] = false;
        } else {
            updatedParentsChecked[parentIndex] = false; // Optional: for indeterminate state handling
        }
        setParentsChecked(updatedParentsChecked);
    };

    return (
        <div>
            <h1>Parents and Children Checkboxes</h1>
            {response.map((parentObj, parentIndex) => {
                const childrenLabels = getChildrenLabels(parentObj.parent);

                return (
                    <div key={parentIndex} style={{ marginBottom: '20px' }}>
                        <div className='parent_checkbox'>
                            <input
                                type="checkbox"
                                checked={parentsChecked[parentIndex]}
                                onChange={() => handleParentChange(parentIndex)}
                            /> Parent {parentIndex + 1}
                        </div>
                        <div className='child_checkbox'>
                            {childrenLabels.map((label, childIndex) => (
                                <div key={childIndex}>
                                    <input
                                        type="checkbox"
                                        checked={childrenChecked[parentIndex][childIndex]}
                                        onChange={() => handleChildChange(parentIndex, childIndex)}
                                    /> {parentObj.parent[label]} {/* Display child values */}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Checkbox;
