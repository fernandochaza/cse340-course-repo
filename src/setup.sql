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

