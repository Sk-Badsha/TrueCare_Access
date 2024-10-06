import React from "react";
import "../../styles/TeamMemberStyles.css";

function TeamMember() {
  const teamMembers = [
    {
      name: "SK Badsha",
      position: "Full Stack Developer",
      image: "/src/assets/Images/image_own.jpg",
      description:
        "You can rely on our amazing features list, and our customer service will be a great experience.",
    },
    {
      name: " Emily Katie",
      position: "Product Manager",
      image: "/src/assets/Images/Member_Two.jpg",
      description:
        "You can rely on our amazing features list, and our customer service will be a great experience.",
    },
    {
      name: "Jane Doe",
      position: "Site Reliability Engineer",
      image: "/src/assets/Images/Member_Three.jpg",
      description:
        "You can rely on our amazing features list, and our customer service will be a great experience.",
    },
  ];

  return (
    <div className="py-5 team3 bg-light">
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-md-7 text-center">
            <h3 className="mb-3">Experienced & Professional Team</h3>
            <h6 className="subtitle font-weight-normal">
              You can rely on our amazing features list and also our customer
              services will be a great experience for you without doubt and in
              no-time.
            </h6>
          </div>
        </div>
        <div className="row">
          {teamMembers.map((member, index) => (
            <div className="col-lg-4 mb-4 member" key={index}>
              <div className="row">
                <div className="col-md-12">
                  <img
                    src={`${member.image}`}
                    alt={member.name}
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-12">
                  <div className="pt-2">
                    <h5 className="mt-4 font-weight-medium mb-0">
                      {member.name}
                    </h5>
                    <h6 className="subtitle">{member.position}</h6>
                    <p>{member.description}</p>
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <a
                          href="mailto:badshabhota@gmail.com"
                          className="text-decoration-none d-block px-1"
                        >
                          <i
                            className="fa-regular fa-envelope"
                            style={{ color: "#d4506c" }}
                          ></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="/"
                          className="text-decoration-none d-block px-1"
                        >
                          <i
                            className="fa-brands fa-square-facebook"
                            style={{ color: "#2a61c0" }}
                          ></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="https://www.instagram.com/badsha0700"
                          className="text-decoration-none d-block px-1"
                        >
                          <i
                            className="fa-brands fa-square-instagram"
                            style={{ color: "#d6295a" }}
                          ></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamMember;
