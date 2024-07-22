// import baseUrls from '@/api/baseUrl'
// import { ServiceRecord } from '@/api/file'
// import setupMock, { successResponseWrap } from '@/utils/setup-mock'
// import Mock from 'mockjs'

// const baseUrl = baseUrls.FILE_SERVER_BASE_URL

// const qualityInspectionList: ServiceRecord[] = [
//   {
//     id: 1,
//     title: '文档库1',
//     createTime: '2021-10-12 00:00:00',
//     description: '这是文档库1',
//     data: [
//       {
//         label: '文档数',
//         value: '5',
//       },
//       {
//         label: '参与人数',
//         value: '12',
//       },
//       {
//         label: '拥有者',
//         value: 'apeiMark',
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: '文档库2',
//     createTime: '2021-10-12 00:00:00',
//     description: '这是文档库2',
//     data: [
//       {
//         label: '文档数',
//         value: '5',
//       },
//       {
//         label: '参与人数',
//         value: '12',
//       },
//       {
//         label: '拥有者',
//         value: 'apeiMark',
//       },
//     ],
//   },
//   {
//     id: 3,
//     title: '文档库3',
//     createTime: '2021-10-12 00:00:00',
//     description: '这是文档库3',
//     data: [
//       {
//         label: '文档数',
//         value: '5',
//       },
//       {
//         label: '参与人数',
//         value: '12',
//       },
//       {
//         label: '拥有者',
//         value: 'apeiMark',
//       },
//     ],
//   },
// ]

// setupMock({
//   setup() {
//     // Quality Inspection
//     Mock.mock(new RegExp(`${baseUrl}/library/list`), () => {
//       return successResponseWrap(
//         {
//           list:qualityInspectionList,
//           total: qualityInspectionList.length
//         }
//       )
//     })
//   },
// })
