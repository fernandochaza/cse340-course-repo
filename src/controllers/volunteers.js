import { addVolunteer, removeVolunteer } from "../models/volunteers.js";

const addVolunteerToProject = async (req, res) => {
  const projectId = req.params.id;
  await addVolunteer(req.session.user.user_id, projectId);
  req.flash("success", "You have signed up to volunteer for this project!");
  res.redirect(`/project/${projectId}`);
};

const removeVolunteerFromProject = async (req, res) => {
  const projectId = req.params.id;
  await removeVolunteer(req.session.user.user_id, projectId);
  req.flash("success", "You have been removed as a volunteer for this project.");
  res.redirect(`/project/${projectId}`);
};

export { addVolunteerToProject, removeVolunteerFromProject };
