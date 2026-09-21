import React from 'react';
import { Cpu, BrainCircuit, Building2, Wrench, CheckCircle2, Layers } from 'lucide-react';

export default function AcademicsPage() {
  const departments = [
    {
      title: 'Computer Engineering',
      code: 'CSE',
      description:
        'Focuses on computer science fundamentals, data structures, algorithm design, database management systems, web technology, and software engineering principles.',
      facilities: [
        'Programming & Data Structures Lab',
        'Web Technology & Database Lab',
        'Computer Networking & Security Setup',
        'High-Speed Internet Workstations',
      ],
      icon: Cpu,
    },
    {
      title: 'Artificial Intelligence & Data Science',
      code: 'AI & DS',
      description:
        'Covers machine learning algorithms, deep learning, statistical data modeling, natural language processing, big data analytics, and modern AI application engineering.',
      facilities: [
        'High-Performance AI Computing Workstations',
        'Data Science & Analytics Lab',
        'Python & Machine Learning Toolsets',
        'Project & Research Workspace',
      ],
      icon: BrainCircuit,
    },
    {
      title: 'Civil Engineering',
      code: 'CIVIL',
      description:
        'Dedicated to structural mechanics, concrete technology, surveying, environmental engineering, geotechnical analysis, and construction project management.',
      facilities: [
        'Structural Engineering & Concrete Testing Lab',
        'Surveying & Geo-Informatics Instruments',
        'Geotechnical Engineering Equipment',
        'Fluid Mechanics & Hydraulics Setup',
      ],
      icon: Building2,
    },
    {
      title: 'Mechanical Engineering',
      code: 'MECH',
      description:
        'Emphasizes thermal engineering, fluid mechanics, computer-aided design (CAD/CAM), manufacturing processes, kinematics, and industrial automation.',
      facilities: [
        'Manufacturing Process Workshop',
        'Fluid Machinery & IC Engines Lab',
        'Computer-Aided Design (CAD) Software Lab',
        'Material Testing & Heat Transfer Setup',
      ],
      icon: Wrench,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Page Header */}
      <div className="space-y-4 border-b border-black/[0.06] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-xs font-semibold text-neutral-800">
          <Layers className="w-3.5 h-3.5" />
          <span>Undergraduate B.Tech Engineering</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900">
          Academic Programs
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 max-w-3xl leading-relaxed">
          VDCET Mouda offers four specialized 4-year B.Tech undergraduate degree programs recognized by DTE Maharashtra (Institute Code: 04141).
        </p>
      </div>

      {/* Program Cards */}
      <div className="space-y-8">
        {departments.map((dept) => {
          const IconComp = dept.icon;
          return (
            <div
              key={dept.title}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-black/[0.06] shadow-apple-sm space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                      {dept.title}
                    </h2>
                    <span className="text-xs font-medium text-neutral-500">Degree: B.Tech (4 Years)</span>
                  </div>
                </div>
                <span className="self-start sm:self-auto text-xs font-mono font-bold px-3 py-1 rounded-lg bg-neutral-100 text-neutral-700">
                  {dept.code}
                </span>
              </div>

              <div className="space-y-4">
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
                  {dept.description}
                </p>

                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Key Laboratories & Facilities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {dept.facilities.map((fac) => (
                      <div
                        key={fac}
                        className="flex items-center gap-2.5 text-xs text-neutral-800 bg-neutral-50 px-3.5 py-2.5 rounded-xl border border-black/[0.04]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{fac}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
