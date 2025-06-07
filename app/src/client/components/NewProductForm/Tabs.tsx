import React from 'react';
import TabStatusBar from './TabStatusBar';

interface TabsProps {
  step: number;
  setStep: (step: number) => void;
  progress: Record<string, number>;
}

const Tabs: React.FC<TabsProps> = ({ step, setStep, progress }) => {
  const tabs = ['General Details', 'Product Metadata', 'Configuration', 'Review'];

  return (
    <div className="tabs mb-4">
      <div className="d-flex justify-content-between">
        {tabs.map((label, index) => (
          <div 
            key={index} 
            className="flex-grow-1 position-relative"
            style={{ maxWidth: '25%' }}
          >
            <TabStatusBar 
              progress={progress[['general', 'metadata', 'config', 'review'][index]] || 0} 
              step={index}
              totalSteps={tabs.length}
            />
            <button
              type="button"
              className={`btn btn-link text-decoration-none w-100 text-center p-2 ${
                step === index ? 'text-primary fw-bold' : 'text-muted'
              }`}
              onClick={() => setStep(index)}
            >
              {label}
            </button>
            {index < tabs.length - 1 && (
              <div className="position-absolute top-50 end-0 h-100 d-flex align-items-center">
                <i className="bi bi-chevron-right text-muted"></i>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
