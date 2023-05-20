import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import {FaRoute} from 'react-icons/fa';
import {BiMessageSquareDetail} from 'react-icons/bi';
import {AiTwotoneExperiment} from 'react-icons/ai';
import {VscVersions} from 'react-icons/vsc';
import {RiSpeedFill} from 'react-icons/ri'; 
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import { Box } from 'grommet';
const FeatureList = [
  {
    title: 'Tracing',
    icon: <FaRoute size="35px"/>,
    description: (
      <>
        Track and store all your executed chain runs. <br/>Gain ultimate insights into your LLM based application.
        
      </>
    ),
    link: 'docs/category/chain-tracing',
  },
  {
    title: 'Prompt tweaking', 
    icon: <BiMessageSquareDetail size="35px"/>,
    description: (
      <>
      
      Tweak your prompts on the production data. Test your prompts on the actual data for every prompt executed. 
      
      </>
    ),
    link:"docs/prompt_tweaking"
  },
  {
    title: 'Template versioning', 
    icon: <VscVersions size="35px"/>,
    description: (
      <>
      <p>Track versions of your prompt templates and see the impact of your changes</p>
      </>
    ),
    link:"docs/prompt_template_versioning"
  },
  {
    title: 'LLM caching', 
    icon: <RiSpeedFill size="35px"/>,
    description: (
      <>
      <p>
     Save time and money by caching your LLM response. Single line of code to speed up your most common prompts.
      </p>
      
      </>
    ),
    link:"docs/caching"
  },
  {
    title: 'Prompt Unit Testing', 
    icon: <AiTwotoneExperiment size="35px"/>,
    description: (
      <>
      <p>
      Do not guess what impact your changes will have. Measure it!
      </p>
      
      </>
    ),
    link:"docs/category/unit-testing"
  },
];

function Feature({Svg, title, description, icon, link}) {
  const history = useHistory();
  return (
    <Box className={clsx('col col--4')}  onClick={link?()=>history.push(link):undefined} focusIndicator={false}>
      
      <div className="text--center">
      {/* {styles.featureSvg  &&<Svg className={styles.featureSvg} role="img" />} */}
        {icon}
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      
    </Box>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
