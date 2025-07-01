import React, { useState } from 'react';
import './Extras.css';

export default function Extras(): JSX.Element {
  const [activeSections, setActiveSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setActiveSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const renderHeader = (label: string, section: string): JSX.Element => (
    <div className="section-header" onClick={() => toggleSection(section)}>
      <span>{label}</span>
      <span className="dropdown-icon">
        {activeSections.includes(section) ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 12.5L10 7.5L5 12.5" stroke="#726E6C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="#726E6C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    </div>
  );

  return (
    <div className="extras-container">
      {/* Setup Fee */}
      <div className="section">
        {renderHeader('Setup Fee(Optional)', 'setupFee')}
        {activeSections.includes('setupFee') && (
          <div className="section-content">
            <label>Enter one-time Setup Fee <span className="optional">(optional)</span></label>
            <input type="text" value="$22" />
            <label>Application Timing</label>
            <input type="text" value="$22" />
            <label>Invoice Description</label>
            <textarea placeholder="Invoice Description"></textarea>
          </div>
        )}
      </div>

      {/* Overage Charges */}
      <div className="section">
        {renderHeader('Overage Charges', 'overageCharges')}
        {activeSections.includes('overageCharges') && (
          <div className="section-content">
            <label>Overage unit rate</label>
            <input type="text" placeholder="Placeholder" />
            <label>Grace buffer <span className="optional">(optional)</span></label>
            <input type="text" placeholder="Placeholder" />
          </div>
        )}
      </div>

      {/* Discounts & Promotions */}
      <div className="section">
        {renderHeader('Discounts ', 'discounts')}
        {activeSections.includes('discounts') && (
          <div className="section-content">
            <label>Discount Type</label>
            <select><option>Placeholder</option></select>
            <label>Enter % discount</label>
            <input type="text" placeholder="Placeholder" />
            <label>Enter Flat Discount Amount</label>
            <input type="text" placeholder="Placeholder" />
            <label>Eligibility</label>
            <select><option>Placeholder</option></select>
            <label>Validity Period</label>
            <div className="date-range">
              <div className="date-input">
                <label>Start Date</label>
                <input type="date" />
              </div>
              <div className="date-input">
                <label>End Date</label>
                <input type="date" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Freemium Setup */}
      <div className="section">
        {renderHeader('Freemium Setup', 'freemium')}
        {activeSections.includes('freemium') && (
          <div className="section-content">
            <label>Freemium Type</label>
            <select><option>Placeholder</option></select>
            <label>Validity Period</label>
            <div className="date-range">
              <div className="date-input">
                <label>Start Date</label>
                <input type="date" />
              </div>
              <div className="date-input">
                <label>End Date</label>
                <input type="date" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Minimum Commitment */}
      <div className="section">
        {renderHeader('Minimum Commitment', 'commitment')}
        {activeSections.includes('commitment') && (
          <div className="section-content">
            <label>Minimum Usage</label>
            <input type="text" placeholder="Placeholder" />
            <label>Minimum Charge</label>
            <input type="text" placeholder="Placeholder" />
          </div>
        )}
      </div>

      {/* Reset Period */}
      <div className="section">
        {renderHeader('Reset Period', 'resetPeriod')}
        {activeSections.includes('resetPeriod') && (
          <div className="section-content">
            <label>Reset Frequency</label>
            <select><option>Placeholder</option></select>
            <label>Validity Period</label>
            <div className="date-range">
              <div className="date-input">
                <label>Start Date</label>
                <input type="date" />
              </div>
              <div className="date-input">
                <label>End Date</label>
                <input type="date" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
