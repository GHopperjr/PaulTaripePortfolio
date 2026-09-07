import React, { useCallback, useEffect, useState } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Chip from '@mui/material/Chip';
import gbccLoggingSystem from '../assets/images/GBCCLoggingSystemimg.png';
import jobApplicationTracker from '../assets/images/JobApplicationTrackerimg.png';
import projectAllocation from '../assets/images/ProjectAllocationimg.png';
import pulse from '../assets/images/Pulseimg.png';
import hikeCavite from '../assets/images/Hikecaviteimg.png';
import '../assets/styles/Project.scss';

type ProjectItem = {
    title: string;
    description: string;
    image: string;
    stack: string[];
    link?: string;
    badge?: string;
};

const projects: ProjectItem[] = [
    {
        title: 'GBCC Logging System',
        description: 'Internal church system for attendance tracking and stewardship recording — tithes, offerings, and other funds.',
        image: gbccLoggingSystem,
        stack: ['C#', 'ASP.NET Core', 'Minimal API', 'Dapper'],
        link: 'https://gbccsystem-gegydhfph0e7fdaw.southeastasia-01.azurewebsites.net/',
    },
    {
        title: 'Job Application Tracker',
        description: 'Web application that lets users track their job applications across different sites, with AI integration for resume assessment and compatibility scoring against the applied job.',
        image: jobApplicationTracker,
        stack: ['React.js', 'TypeScript', 'AI Integration'],
        link: 'https://job-application-tracker-git-dev-gh-opper.vercel.app/',
    },
    {
        title: 'One Magsaysay IT Project Allocation System',
        description: 'Project presented for revalida, tracking project assignments across Strategic Business Units for department-wide workforce utilization and visibility.',
        image: projectAllocation,
        stack: ['C#', 'ASP.NET', 'Minimal API', 'Dapper', 'SQL Server'],
        badge: 'Internal project',
    },
    {
        title: 'Pulse',
        description: 'Serverless feedback and response analytics platform. Built the Response Summary and Individual Responses reporting features computing CSAT scores and quarterly trends, plus a single-table DynamoDB schema and automated respondent reminders.',
        image: pulse,
        stack: ['Python', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'EventBridge', 'SES', 'Serverless Framework', 'React.js'],
        badge: 'Internal project',
    },
    {
        title: 'HikeCavite',
        description: 'College capstone hiking companion app assisting hikers before, during, and after the hike — rule-based hike matching, offline interactive maps, mountain profiles, and user-to-user messaging, plus an admin content-management dashboard.',
        image: hikeCavite,
        stack: ['React Native', 'React.js', 'Node.js', 'Firebase', 'Cloudinary'],
        badge: 'Capstone project',
    },
];

const AUTO_SLIDE_INTERVAL = 5500;

function Project() {
    const total = projects.length;
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const goTo = useCallback((index: number) => {
        setActiveIndex((index + total) % total);
    }, [total]);

    // Depending on activeIndex means any navigation — arrow, dot, or a peeking
    // card click — restarts the countdown, so auto-slide never fires right
    // after the user just moved somewhere on their own.
    useEffect(() => {
        const prefersReducedMotion = typeof window.matchMedia === 'function'
            && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            return;
        }

        const timer = setInterval(() => {
            setActiveIndex((current) => (current + 1) % total);
        }, AUTO_SLIDE_INTERVAL);

        return () => clearInterval(timer);
    }, [activeIndex, total]);

    // Shortest-path offset from the active card, so the deck wraps around seamlessly.
    const getOffset = (index: number) => {
        let offset = index - activeIndex;
        if (offset > total / 2) {
            offset -= total;
        }
        if (offset < -total / 2) {
            offset += total;
        }
        return offset;
    };

    const getCardStyle = (offset: number): React.CSSProperties => {
        const distance = Math.abs(offset);
        const direction = Math.sign(offset);

        if (distance === 0) {
            return { transform: 'translateX(0) scale(1)', opacity: 1, zIndex: 30 };
        }

        if (distance === 1) {
            return {
                transform: `translateX(${direction * 58}%) scale(0.85)`,
                opacity: 0.45,
                zIndex: 20,
            };
        }

        return {
            transform: `translateX(${direction * 78}%) scale(0.72)`,
            opacity: 0,
            zIndex: 10,
        };
    };

    return (
    <div className="projects-container" id="projects">
        <h1>Projects</h1>
        <div
            className="projects-carousel"
            aria-roledescription="carousel"
            aria-label="Projects"
        >
            <div className="carousel-stage">
                {projects.map((project, index) => {
                    const offset = getOffset(index);
                    const isActive = offset === 0;
                    const isAdjacent = Math.abs(offset) === 1;

                    return (
                        <article
                            key={project.title}
                            className={`project-card${isActive ? ' is-active' : ''}${isAdjacent ? ' is-adjacent' : ''}`}
                            style={getCardStyle(offset)}
                            aria-hidden={!isActive}
                            onClick={isAdjacent ? () => goTo(index) : undefined}
                        >
                            <div className="card-thumbnail">
                                <img src={project.image} alt={`${project.title} preview`}/>
                            </div>
                            <div className="card-body">
                                <div className="card-heading">
                                    {project.link ? (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            tabIndex={isActive ? 0 : -1}
                                        >
                                            <h2>{project.title}<OpenInNewIcon className="link-icon"/></h2>
                                        </a>
                                    ) : (
                                        <h2>{project.title}</h2>
                                    )}
                                    {project.badge && (
                                        <span className="card-badge">
                                            <LockOutlinedIcon/>{project.badge}
                                        </span>
                                    )}
                                </div>
                                <p>{project.description}</p>
                                <div className="flex-chips">
                                    {project.stack.map((tech) => (
                                        <Chip key={tech} className="chip" label={tech}/>
                                    ))}
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>

            <div className="carousel-controls">
                <button
                    type="button"
                    className="carousel-arrow"
                    onClick={() => goTo(activeIndex - 1)}
                    aria-label="Previous project"
                >
                    <ArrowBackIosNewIcon/>
                </button>
                <div className="carousel-dots">
                    {projects.map((project, index) => (
                        <button
                            key={project.title}
                            type="button"
                            className={`carousel-dot${index === activeIndex ? ' is-active' : ''}`}
                            onClick={() => goTo(index)}
                            aria-label={`Go to ${project.title}`}
                            aria-current={index === activeIndex}
                        />
                    ))}
                </div>
                <button
                    type="button"
                    className="carousel-arrow"
                    onClick={() => goTo(activeIndex + 1)}
                    aria-label="Next project"
                >
                    <ArrowForwardIosIcon/>
                </button>
            </div>
        </div>
    </div>
    );
}

export default Project;
