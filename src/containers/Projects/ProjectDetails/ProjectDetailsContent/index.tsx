import React, {FC, useEffect} from 'react';

import {format} from 'fecha';
import Linkify from 'linkifyjs/react';
import {useWindowDimensions} from 'hooks';
import {Milestone, Project, ProjectTopic, ProjectTopicTitle} from 'types/projects';
import {getMultiLineDivFromString} from 'utils/strings';
import ProjectDetailsTopic from '../ProjectDetailsTopic';
import {projectDetailsTopic} from '../constants';
import './ProjectDetailsContent.scss';

type Props = {
  milestones: Milestone[];
  project: Project;
  currentTopic: ProjectTopic;
};

const TOP_NAV_HEIGHT = 60;
const DETAILS_CONTAINER_HEIGHT = 158;
const DETAILS_CONTAINER_HEIGHT_480 = 241;

const ProjectDetailsContent: FC<Props> = ({milestones, project, currentTopic}) => {
  const {width} = useWindowDimensions();
  const detailsHeaderHeight = width >= 480 ? DETAILS_CONTAINER_HEIGHT : DETAILS_CONTAINER_HEIGHT_480;
  useEffect(() => {
    const element = document.getElementById(currentTopic.anchor);
    const scrollBehavior = element ? 'smooth' : 'auto';

    // scroll to top if it is the first topic, else scroll directly to the topic
    const top =
      currentTopic.title === ProjectTopicTitle.Overview || !element
        ? 0
        : element.offsetTop - TOP_NAV_HEIGHT - detailsHeaderHeight;

    window.scrollTo({behavior: scrollBehavior, top});
  }, [currentTopic, detailsHeaderHeight]);

  const renderMilestones = () => {
    return milestones.map((milestone) => {
      return (
        <div className="ProjectDetailsContent__milestone" key={milestone.number}>
          <h3 className="ProjectDetailsContent__milestone-number">Milestone {milestone.number}</h3>
          <div className="ProjectDetailsContent__milestone-description">
            <Linkify options={{target: '_blank'}}>{getMultiLineDivFromString(milestone.description)}</Linkify>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="ProjectDetailsContent">
      <ProjectDetailsTopic
        id={projectDetailsTopic.overview.anchor}
        content={project.overview}
        iconType={projectDetailsTopic.overview.iconType}
        overview={projectDetailsTopic.overview.overview}
        title={projectDetailsTopic.overview.title}
      />
      <ProjectDetailsTopic
        id={projectDetailsTopic.problem.anchor}
        content={project.problem}
        iconType={projectDetailsTopic.problem.iconType}
        overview={projectDetailsTopic.problem.overview}
        title={projectDetailsTopic.problem.title}
      />
      <ProjectDetailsTopic
        id={projectDetailsTopic.target_market.anchor}
        content={project.target_market}
        iconType={projectDetailsTopic.target_market.iconType}
        overview={projectDetailsTopic.target_market.overview}
        title={projectDetailsTopic.target_market.title}
      />
      <ProjectDetailsTopic
        id={projectDetailsTopic.benefits.anchor}
        content={project.benefits}
        iconType={projectDetailsTopic.benefits.iconType}
        overview={projectDetailsTopic.benefits.overview}
        title={projectDetailsTopic.benefits.title}
      />
      <ProjectDetailsTopic
        id={projectDetailsTopic.centered_around_tnb.anchor}
        content={project.centered_around_tnb}
        iconType={projectDetailsTopic.centered_around_tnb.iconType}
        overview={projectDetailsTopic.centered_around_tnb.overview}
        title={projectDetailsTopic.centered_around_tnb.title}
      />
      <ProjectDetailsTopic
        id={projectDetailsTopic.estimated_completion_date.anchor}
        content={format(new Date(project.estimated_completion_date), 'D MMMM YYYY - ddd')}
        iconType={projectDetailsTopic.estimated_completion_date.iconType}
        overview={projectDetailsTopic.estimated_completion_date.overview}
        title={projectDetailsTopic.estimated_completion_date.title}
      />
      <ProjectDetailsTopic
        id={projectDetailsTopic.roadmap.anchor}
        content={renderMilestones()}
        iconType={projectDetailsTopic.roadmap.iconType}
        overview={projectDetailsTopic.roadmap.overview}
        title={projectDetailsTopic.roadmap.title}
      />
    </div>
  );
};

export default ProjectDetailsContent;