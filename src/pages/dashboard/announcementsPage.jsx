import React from 'react';
import styled from 'styled-components';
import DashboardLayout from '@/components/misc/dashboardLayout';
import PageTitle from '@/components/misc/pageTitle';

const AnnouncementContainer = styled.div`
  padding: 55px;
  box-sizing: border-box;
`;

const AnnouncementCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.2s ease-in-out;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImportantAnnouncementCard = styled(AnnouncementCard)`
  border: 2px solid #ff6347;
`;

const AnnouncementTitle = styled.h2`
  color: #333;
  font-size: ${(props) => (props.isImportant ? '24px' : '20px')};
  margin-bottom: 10px;
  font-weight: ${(props) => (props.isImportant ? 'bold' : 'normal')};
  color: ${(props) => (props.isImportant ? '#ff6347' : '#333')};
`;

const AnnouncementContent = styled.p`
  color: #555;
  font-size: 14px;
`;

const AnnouncementPage = () => {
  // Dummy data for announcements
  const announcements = [
    {
      title: 'Important Announcement',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel justo in neque porta aliquet.',
      isImportant: true,
    },
    {
      title: 'Upcoming Event',
      content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
      isImportant: false,
    },
    {
      title: 'New Feature Release',
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      isImportant: false,
    },
  ];

  return (
    <div className="announcement-page-container">
      <DashboardLayout>
        <PageTitle title="Announcements" />
        <AnnouncementContainer>
          {announcements.map((announcement, index) => (
            <React.Fragment key={index}>
              {announcement.isImportant ? (
                <ImportantAnnouncementCard>
                  <AnnouncementTitle isImportant>{announcement.title}</AnnouncementTitle>
                  <AnnouncementContent>{announcement.content}</AnnouncementContent>
                </ImportantAnnouncementCard>
              ) : (
                <AnnouncementCard>
                  <AnnouncementTitle>{announcement.title}</AnnouncementTitle>
                  <AnnouncementContent>{announcement.content}</AnnouncementContent>
                </AnnouncementCard>
              )}
            </React.Fragment>
          ))}
        </AnnouncementContainer>
      </DashboardLayout>
    </div>
  );
};

export default AnnouncementPage;