import React, { useState } from 'react';
import './TieredPricingDetails.css';

interface Tier {
  from: number;
  to: number;
  price: number;
}

interface TieredPricingDetailsProps {
  tiers: Tier[];
  onAddTier: () => void;
  onDeleteTier?: (index: number) => void; // Optional if not used
  onChange: (index: number, field: keyof Tier, value: string) => void;
}

const TieredPricingDetails: React.FC<TieredPricingDetailsProps> = ({
  tiers,
  onAddTier,
  onDeleteTier,
  onChange
}) => {
  const [noUpperLimit, setNoUpperLimit] = useState<boolean>(false);

  return (
    <div className="tiered-pricing-container">
      <div className="tiered-pricing-columns">
        {tiers.map((tier, index) => (
          <div key={index} className="tier-row">
            <div className="tier-cell">
              <input
                type="number"
                value={tier.from}
                onChange={(e) => onChange(index, "from", e.target.value)}
                placeholder="Start"
                className="tier-input"
              />
            </div>

            <div className="tier-cell">
              <input
                type="number"
                value={tier.to}
                onChange={(e) => onChange(index, "to", e.target.value)}
                placeholder="End"
                className="tiers-input"
                disabled={noUpperLimit && index === tiers.length - 1}
              />
            </div>

            <div className="tier-cell">
              <input
                type="text"
                value={`$${tier.price}`}
                onChange={(e) =>
                  onChange(index, "price", e.target.value.replace("$", ""))
                }
                placeholder="Price"
                className="tier-inputs"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="tier-actions">
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={noUpperLimit}
            onChange={() => setNoUpperLimit(!noUpperLimit)}
          />
          No upper limit for this tier
        </label>

        <button onClick={onAddTier} className="add-tier-btn">
          Add Tier
        </button>
      </div>
    </div>
  );
};

export default TieredPricingDetails;