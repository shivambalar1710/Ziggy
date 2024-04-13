import React from 'react';
import { RxPadding } from 'react-icons/rx';

const teamMembers = [
  {
    id: 1,
    name: 'Prasit Singh Dol',
    role: 'Project Manager',
    description: 'Prasit coordinates projects from initiation to closure, ensuring timely delivery within budget.',
    image: '',
  },
  {
    id: 2,
    name: 'Arshil Shingala',
    role: 'Back End Developer',
    description: 'Arshil specializes in server-side logic, database interactions, and integrating the application with other web services.',
    image: 'https://media.licdn.com/dms/image/D4D03AQFl_LV1L3ARsg/profile-displayphoto-shrink_800_800/0/1676323334806?e=2147483647&v=beta&t=3tsLnoovnlItgYMYcfJntHcdrBJb8SXwRQ2_mP0-fJ8',
  },
  {
    id: 3,
    name: 'Baljinder Singh',
    role: 'Front End Developer',
    description: 'Baljinder focuses on the user interface and user experience, bringing designs to life in the browser.',
    image: 'path/to/image',
  },
  {
    id: 4,
    name: 'Shivam Balar',
    role: 'Full Stack Developer',
    description: 'Shivam has a wide skill set, handling both front-end and back-end development tasks.',
    image: 'https://media.licdn.com/dms/image/D5603AQG1qAsK9IXMew/profile-displayphoto-shrink_200_200/0/1703486694055?e=2147483647&v=beta&t=F6gKLsjEZH-YiY1gJd6KhqWFuvAzWszE0XXLtlkDVUo',
  },
  {
    id: 5,
    name: 'Prabhoy Malhi Singh',
    role: 'Database Administrator',
    description: 'Prabh is responsible for managing and maintaining the database systems, ensuring data integrity and security.',
    image: 'https://media.licdn.com/dms/image/D4E03AQH8D9hRqdXN9g/profile-displayphoto-shrink_200_200/0/1707075805903?e=2147483647&v=beta&t=UwfRcvYEHJTth1gelmZDY8mcSRTRa8VLEeHktmQbdSw',
  },
  {
    id: 6,
    name: 'Shrey Patel',
    role: 'QA Inspector',
    description: 'Shrey ensures the quality of applications through manual testing, automated tests, and bug tracking.',
    image: 'path/to/image',
  }
];

const AboutUsPage = () => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Meet Our Team</h2>
      <div className="row">
        {teamMembers.map(member => (
          <div key={member.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={member.image} className="card-img-top" alt={member.name}  width={200} height={200}/>
              <div className="card-body">
                <h5 className="card-title">{member.name}</h5>
                <p className="card-text"><strong>Role:</strong> {member.role}</p>
                <p className="card-text">{member.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsPage;
