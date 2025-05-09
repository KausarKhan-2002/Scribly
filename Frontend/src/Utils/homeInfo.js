import {
  FaTasks,
  FaUserPlus,
  FaComments,
  FaChartPie,
  FaUserCheck,
  FaCheckDouble,
  FaUserTimes,
  FaHandshake,
  FaUserShield,
  FaLock,
  FaShieldAlt,
  FaCommentDots,
  FaShareAlt,
  FaFileExcel,
} from "react-icons/fa";

export const taskInfo = {
  taskFeatures: {
    category: "Task Features",
    features: [
      {
        icon: FaTasks,
        title: "Create and Manage Tasks",
        paragraph:
          "Easily create tasks, set goals, and keep your workflow organized within a professional dashboard.",
      },
      {
        icon: FaUserCheck,
        title: "Assign Tasks to Friends",
        paragraph:
          "Collaborate by assigning tasks to friends and get help completing your goals more effectively.",
      },
      {
        icon: FaCheckDouble,
        title: "Track Completion Status",
        paragraph:
          "Friends can mark tasks as complete, keeping everyone updated on task progress in real-time.",
      },
      {
        icon: FaUserTimes,
        title: "Remove Task Assignments",
        paragraph:
          "Reassign or remove friends from a task anytime based on evolving needs and priorities.",
      },
      {
        icon: FaUserPlus,
        title: "Build Your Network",
        paragraph:
          "Expand your team by adding new friends. Build connections by following other users, and strengthen collaboration by growing your network.",
      },
      {
        icon: FaFileExcel,
        title: "Download Task Report in Excel",
        paragraph:
          "Group admins can download detailed task reports in Excel format. This allows for easy data analysis, backup, and sharing of task progress and completion status with stakeholders.",
      },
    ],
  },

  socialCollaboration: {
    category: "Social Colloboration",
    features: [
      {
        icon: FaUserPlus,
        title: "Follow and Connect with Friends",
        paragraph:
          "Follow other users to send friend requests and build meaningful task-based collaborations.",
      },
      {
        icon: FaHandshake,
        title: "Mutual Friendship for Task Assignment",
        paragraph:
          "Assign tasks only after a successful connection between both users to ensure trusted collaboration.",
      },
      {
        icon: FaComments,
        title: "In-Task Chat with Friends",
        paragraph:
          "Discuss task details and progress directly through chat, streamlining communication within tasks.",
      },
      {
        icon: FaUserShield,
        title: "Role-Based Access Control",
        paragraph:
          "Only group admins can fully update or delete tasks; others can only update their assigned status.",
      },
      {
        icon: FaCommentDots,
        title: "Group Chats for Task Discussion",
        paragraph:
          "Create group chats with your team and discuss tasks in real-time. Exchange ideas, provide updates, and collaborate to complete tasks successfully.",
      },
      {
        icon: FaShareAlt,
        title: "Share Tasks with Teams",
        paragraph:
          "Share tasks, updates, and documents with your team members effortlessly. Use simple sharing options to collaborate on tasks with ease.",
      },
    ],
  },

  analyticsTrust: {
    category: "Analytics & Trust",
    features: [
      {
        icon: FaChartPie,
        title: "Data Visualization",
        paragraph:
          "Dynamic bar and pie charts enhance task insights, making progress tracking simple and visual.",
      },
      {
        icon: FaLock,
        title: "Free and Secure",
        paragraph:
          "Your data is securely stored and the platform is entirely free to use — built for transparency.",
      },
      {
        icon: FaShieldAlt,
        title: "Password Hashing & Token Security",
        paragraph:
          "Your passwords are securely hashed, and tokens are generated with the highest level of encryption, ensuring that your account remains safe at all times.",
      },
    ],
  },
};
