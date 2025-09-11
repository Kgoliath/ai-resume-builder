// frontend/src/components/ResumePreview.jsx
import React from 'react';
import TemplateModern from './templates/TemplateModern';
import TemplateClassic from './templates/TemplateClassic';
import TemplateProfessional from './templates/TemplateProfessional';

function ResumePreview({ data, template = 'modern' }) {
  const renderTemplate = () => {
    switch (template) {
      case 'classic':
        return <TemplateClassic data={data} />;
      case 'professional':
        return <TemplateProfessional data={data} />;
      case 'modern':
      default:
        return <TemplateModern data={data} />;
    }
  };

  return (
    <div>
      {renderTemplate()}
    </div>
  );
}

export default ResumePreview;