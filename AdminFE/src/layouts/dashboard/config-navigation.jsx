import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'ApplicationUI',
    icon: icon('ic_applicationUI'),
    iconRight: icon('ic_arrdown'),
    children: [
      {
        title: 'introduce',
        path: '/introduce',
        icon: icon('ic_introduce'),
      },
      {
        title: 'banner',
        path: '/banner',
        icon: icon('ic_slide'),
      },
      {
        title: 'news',
        path: '/news',
        icon: icon('ic_news'),
      },
    ],
  },
  {
    title: 'course',
    path: '/course',
    icon: icon('ic_course'),
  },
  {
    title: 'grade',
    path: '/grade',
    icon: icon('ic_grade'),
  },
  {
    title: 'curriculum',
    path: '/curriculum',
    icon: icon('ic_curriculum'),
  },
  {
    title: 'subject',
    path: '/subject',
    icon: icon('ic_subject'),
  },
  {
    title: 'quiz',
    path: '/quiz',
    icon: icon('ic_quiz'),
  },
  {
    title: 'course test',
    path: '/courseTest',
    icon: icon('ic_course_test'),
  },
  {
    title: 'test document',
    icon: icon('ic_test_doc'),
    iconRight: icon('ic_arrdown'),
    children: [
      {
        title: 'test document system',
        path: '/testDocSystem',
        icon: icon('ic_test_doc_sys'),
      },
      {
        title: 'test document app',
        path: '/testDocument',
        icon: icon('ic_test_doc_app'),
      },
    ],
  },
  {
    title: 'faq',
    path: '/faq/faqUnApprove',
    icon: icon('ic_faq'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
];

export default navConfig;
