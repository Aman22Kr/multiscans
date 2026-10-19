import { REF } from '../config';

export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
export const img = (p) => `${REF}${p}`;
export const BRANCHES = ['Valasaravakkam', 'Karapakkam (OMR)', 'Avadi', 'Tondiarpet', 'Ekkaduthangal', 'Tambaram', 'Vellore', 'Virudhachalam'];
export const CATEGORIES = [
  { slug: 'bone', name: 'Bone' }, { slug: 'surgery', name: 'Surgery' }, { slug: 'heart', name: 'Heart' },
  { slug: 'anemia', name: 'Anemia' }, { slug: 'diabetes', name: 'Diabetes' }, { slug: 'liver', name: 'Liver' },
];

const scan = (slug, name, desc, tags, price) => ({ type: 'scan', slug, name, desc, tags, price });
export const SCANS = [
  scan('mri-3-t', 'MRI (3T)', 'High-field 3 Tesla MRI for detailed brain, spine and joint imaging.', ['surgery', 'bone'], null),
  scan('mri-1-5-t', 'MRI (1.5T)', 'Reliable 1.5 Tesla MRI for routine neurological and musculoskeletal studies.', ['surgery', 'bone'], null),
  scan('ct-80-64-slices', 'CT (80/64 slices)', 'Fast multi-slice CT scanning with low-dose protocols.', ['surgery', 'heart'], null),
  scan('digital-x-ray', 'Digital X-Ray', 'Precise digital imaging at affordable prices.', ['bone', 'heart'], 499),
  scan('usg-abdomen', 'USG Abdomen', 'Ultrasound of the abdomen, commonly used for liver and kidney screening.', ['liver'], null),
];

const t = (name, tags = []) => ({ type: 'test', slug: slugify(name), name, tags, price: null, desc: `${name} is available as a standalone lab test or inside our packages (sample copy).` });
export const TESTS = [
  t('Complete Blood Count', ['anemia']), t('Erythrocyte Sedimentation Rate - ESR', ['anemia']),
  t('Blood Glucose Fasting', ['diabetes']), t('Glycosylated Haemoglobin - HbA1c', ['diabetes']),
  t('Urea'), t('Creatinine'), t('Uric Acid', ['bone']), t('Iron', ['anemia']), t('Calcium', ['bone']),
  t('Total Cholesterol', ['heart']), t('Triglycerides', ['heart']), t('HDL Cholesterol - Direct', ['heart']),
  t('LDL Cholesterol', ['heart']), t('Bilirubin Total', ['liver']), t('SGOT', ['liver']), t('SGPT', ['liver']),
  t('Alkaline Phosphatase - ALP', ['liver']), t('Gamma-Glutamyl Transferase - GGT', ['liver']),
  t('Thyroid Stimulating Hormone - TSH'), t('Total Thyroxine - T4'), t('Total Triiodothyronine - T3'),
  t('Urine Routine Analysis'), t('ECG', ['heart']),
];

const pkg = (slug, group, name, count, price, mrp, tests, tags) => ({ type: 'package', slug, group, name, count, price, mrp, tests, tags, desc: `${count} tests included. Report by 6 pm.` });
export const PACKAGES = [
  pkg('nalan-basic', 'nalan', 'Nalan – Basic', 57, 999, 2000, ['Complete Blood Count', 'ESR', 'Blood Glucose Fasting', 'Urea', 'Creatinine', 'Uric Acid', 'Lipid profile', 'T3, T4, TSH', 'Urine Routine Analysis'], ['diabetes', 'heart']),
  pkg('nalan-silver', 'nalan', 'Nalan – Silver', 72, 1499, 3200, ['Complete Blood Count', 'HbA1c', 'Kidney profile', 'Liver function tests', 'Lipid profile', 'T3, T4, TSH', 'Urine Routine Analysis'], ['diabetes', 'liver', 'heart']),
  pkg('nalan-gold', 'nalan', 'Nalan – Gold', 81, 1799, 4500, ['Complete Blood Count', 'HbA1c', 'eGFR', 'Electrolytes', 'Liver function tests', 'Lipid profile', 'T3, T4, TSH', 'Urine Routine Analysis'], ['diabetes', 'liver', 'heart']),
  pkg('nalvazhvu-basic-1-1', 'nalvazhvu', 'Nalvazhvu - Basic', 67, 999, 3000, ['Complete Blood Count', 'Blood Glucose Fasting', 'Kidney profile', 'Lipid profile', 'Liver function tests', 'X-Ray Chest AP', 'ECG'], ['heart', 'liver']),
  pkg('nalvazhvu-silver-2-1', 'nalvazhvu', 'Nalvazhvu - Silver', 81, 1999, 7000, ['Complete Blood Count', 'Blood Group ABO & Rh', 'HbA1c', 'Iron, Calcium', 'ECG', 'X-Ray Chest AP', 'USG Abdomen', 'Thyroid profile'], ['anemia', 'diabetes', 'bone']),
  pkg('nalvazhvu-male-silver-permium', 'nalvazhvu', 'Nalvalzhvu - Silver Advance (Male)', 82, 3499, 9500, ['Complete Blood Count', 'HbA1c', 'Liver function tests', 'Lipid profile', 'ECHO', 'ECG', 'X-Ray Chest AP', 'USG Abdomen'], ['heart', 'anemia']),
];

export const ALL_ITEMS = [...SCANS, ...PACKAGES, ...TESTS];
export const itemPath = (i) => `/${i.type}/${i.slug}`;
export const findItem = (type, slug) => ALL_ITEMS.find((i) => i.type === type && i.slug === slug);
export const searchItems = (q) => {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return ALL_ITEMS.filter((i) => `${i.name} ${i.desc} ${i.tags.join(' ')} ${(i.tests || []).join(' ')}`.toLowerCase().includes(s));
};

export const TESTIMONIALS = [
  { name: 'menta venkata dinesh', when: 'A month ago', text: 'Took MRI scan here. Staff is very helpful. They provide lockers for valuables and a changing room for ladies.' },
  { name: 'senthil kumaran', when: '6 days ago', text: 'The doctor took enough time to explain the condition in detail and answered all my questions clearly during my scan visit.' },
  { name: 'SAKTHI G', when: '3 months ago', text: 'Technicians and staff were very cooperative and took care of me properly. Highly recommend for MRI.' },
  { name: 'Meenakshi Subbu', when: 'A month ago', text: 'The senior nurse explained the procedure of the scans clearly, the lab was very clean and the staff were kind.' },
  { name: 'Gokulakrishna Selvaganapathy', when: 'A month ago', text: 'Place is neat and clean and well maintained. Test procedures were explained before taking tests.' },
];

export const STATIC_PAGES = {
  'about-us': { title: 'About Us', body: ['{B} is a diagnostic centre offering MRI, CT, X-ray, ultrasound and lab tests with home sample collection.', 'This is a demo recreation of a public website. All copy, numbers and claims on this page are sample content and are not real.'] },
  careers: { title: 'Careers', body: ['We are always looking for radiology technologists, phlebotomists and front-desk staff.', 'Sample openings: Radiology Technologist, Phlebotomist, Patient Care Executive. Applications are not collected in this demo.'] },
  blogs: { title: 'Blogs', body: ['Sample articles (placeholder content):', '• When is an MRI recommended over a CT scan?', '• How to prepare for a fasting blood test', '• What is included in a full body health checkup?'] },
  'privacy-policy': { title: 'Privacy Policy', body: ['This demo stores only your own entries (such as saved items and demo form drafts) in your browser localStorage. Nothing is sent to a server.', 'localStorage is specific to your browser and device and does not sync across devices.'] },
  'terms-and-conditions': { title: 'Terms & Conditions', body: ['This is a demonstration website. Booking, callback and prescription forms do not submit anything to a real service and no appointment is made.'] },
};
