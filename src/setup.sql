CREATE TABLE organization (
	organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES (
	'BrightFuture Builders',
	'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
	'info@brightfuturebuilders.org',
	'brightfuture-logo.png'
), (
	'GreenHarvest Growers',
	'An urban farming collective promoting food sustainability and education in local neighborhoods.',
	'contact@greenharvest.org',
	'greenharvest-logo.png'
), (
	'UnityServe Volunteers',
	'A volunteer coordination group supporting local charities and service initiatives.',
	'hello@unityserve.org',
	'unityserve-logo.png'
);

CREATE TABLE service_project (
	service_project_id SERIAL PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES organization(organization_id),
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
	location VARCHAR(255) NOT NULL,
  project_date DATE NOT NULL
);

INSERT INTO service_project (organization_id, title, description, location, project_date)
VALUES
  -- BrightFuture Builders (organization_id = 1)
  (1, 'Community Center Renovation', 'Renovating the east side community center with new flooring, lighting, and accessibility ramps.', '142 Elm Street, Springfield', '2026-06-15'),
  (1, 'Playground Build', 'Constructing a new sustainable playground using recycled materials for the Riverside neighborhood.', 'Riverside Park, Springfield', '2026-07-20'),
  (1, 'Habitat Home Frame Raise', 'Volunteer frame-raising event for a new affordable housing unit in partnership with local donors.', '89 Maple Ave, Springfield', '2026-08-05'),
  (1, 'School Roof Repair', 'Repairing the roof of Lincoln Elementary School to prevent water damage ahead of winter.', '310 Lincoln Blvd, Springfield', '2026-09-12'),
  (1, 'Senior Center Accessibility Upgrade', 'Installing wheelchair ramps and widening doorways at the downtown senior center.', '55 Oak Drive, Springfield', '2026-10-03'),

  -- GreenHarvest Growers (organization_id = 2)
  (2, 'Spring Planting Day', 'Community planting event to establish raised garden beds in the Northside urban farm.', 'Northside Urban Farm, Springfield', '2026-04-18'),
  (2, 'Composting Workshop', 'Hands-on workshop teaching residents how to start and maintain backyard compost systems.', 'Springfield Public Library, Springfield', '2026-05-10'),
  (2, 'School Garden Launch', 'Installing and planting a vegetable garden at Jefferson Middle School with student involvement.', '220 Jefferson Way, Springfield', '2026-06-01'),
  (2, 'Harvest Festival Prep', 'Preparing and staffing the annual harvest festival including food demos and produce giveaways.', 'Central Market Square, Springfield', '2026-09-27'),
  (2, 'Winter Greens Greenhouse Build', 'Building a small heated greenhouse to extend growing season for leafy greens into winter months.', 'Northside Urban Farm, Springfield', '2026-11-08'),

  -- UnityServe Volunteers (organization_id = 3)
  (3, 'Food Bank Sort & Pack', 'Sorting and packaging donated food items at the regional food bank for weekly distribution.', 'Springfield Food Bank, 400 Industrial Rd', '2026-05-24'),
  (3, 'Literacy Tutoring Program', 'One-on-one tutoring sessions for adult learners working toward their GED certificates.', 'Westside Community Center, Springfield', '2026-06-07'),
  (3, 'Clothing Drive & Distribution', 'Collecting, organizing, and distributing donated clothing to families in need.', 'First Baptist Church, 88 Church St', '2026-07-13'),
  (3, 'Animal Shelter Volunteer Day', 'Assisting shelter staff with animal care, cleaning, and adoption event coordination.', 'Springfield Animal Shelter, Springfield', '2026-08-22'),
  (3, 'Park Cleanup & Beautification', 'Removing litter and invasive plants and planting native flowers throughout Greenway Park.', 'Greenway Park, Springfield', '2026-09-06');


CREATE TABLE project_categories (
	category_id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL UNIQUE,
	image_filename VARCHAR(255)
);

INSERT INTO project_categories (name, image_filename)
VALUES
  ('Construction & Infrastructure', 'cat-construction.png'),
  ('Environmental Sustainability',  'cat-environmental.png'),
  ('Food Security',                 'cat-food-security.png'),
  ('Education & Literacy',          'cat-education.png'),
  ('Social Services',               'cat-social-services.png');


CREATE TABLE service_project_category (
	service_project_id INT NOT NULL REFERENCES service_project(service_project_id),
	category_id INT NOT NULL REFERENCES project_categories(category_id),
	PRIMARY KEY (service_project_id, category_id)
);


INSERT INTO service_project_category (service_project_id, category_id)
VALUES
  (1, 1),  -- Community Center Renovation
  (2, 1),  -- Playground Build
  (3, 1),  -- Habitat Home Frame Raise
  (4, 1),  -- School Roof Repair
  (5, 1),  -- Senior Center Accessibility Upgrade

-- GreenHarvest Growers projects → Environmental Sustainability (2), Food Security (3), Education & Literacy (4)
  (6, 2),  -- Spring Planting Day → Environmental Sustainability
  (6, 3),  -- Spring Planting Day → Food Security
  (7, 2),  -- Composting Workshop → Environmental Sustainability
  (7, 4),  -- Composting Workshop → Education & Literacy
  (8, 2),  -- School Garden Launch → Environmental Sustainability
  (8, 4),  -- School Garden Launch → Education & Literacy
  (9, 3),  -- Harvest Festival Prep → Food Security
  (10, 2), -- Winter Greens Greenhouse Build → Environmental Sustainability
  (10, 3), -- Winter Greens Greenhouse Build → Food Security

-- UnityServe Volunteers projects → Food Security (3), Education & Literacy (4), Social Services (5)
  (11, 3), -- Food Bank Sort & Pack → Food Security
  (11, 5), -- Food Bank Sort & Pack → Social Services
  (12, 4), -- Literacy Tutoring Program → Education & Literacy
  (12, 5), -- Literacy Tutoring Program → Social Services
  (13, 5), -- Clothing Drive & Distribution → Social Services
  (14, 5), -- Animal Shelter Volunteer Day → Social Services
  (15, 2), -- Park Cleanup & Beautification → Environmental Sustainability
  (15, 5); -- Park Cleanup & Beautification → Social Services