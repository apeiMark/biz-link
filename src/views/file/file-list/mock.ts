// import baseUrls from '@/api/baseUrl'
// import { GetParams } from '@/types/global'
// import setupMock, { successResponseWrap } from '@/utils/setup-mock'
// import Mock from 'mockjs'
// import qs from 'query-string'

// const baseUrl = baseUrls.FILE_SERVER_BASE_URL


// setupMock({
//   setup() {
//     Mock.mock(new RegExp(`${baseUrl}/library/optionList`), (params: GetParams) => {
//       return successResponseWrap({
//         list: 
//         [{
//           label: "文本库1",
//           value: "1813178945621852160"
//         },
//         {
//           label: "文本库2",
//           value: "1813178945621852161"
//         },
//         {
//           label: "文本库3",
//           value: "1813178945621852162"
//         }],
//         total: 3,
//       })
//     })
//   },
// })


// setupMock({
//   setup() {
//     Mock.mock(new RegExp(`${baseUrl}/document/list`), (params: GetParams) => {
//       const { current = 1, pageSize = 10 } = qs.parseUrl(params.url).query
//       const p = current as number
//       const ps = pageSize as number
//       return successResponseWrap({
//         list: [
//           {
//             id: '1',
//             name: '数学建模资料',
//             documentType: 'PDF',
//             documentSize: 50,
//             libraryId: '1813178945621852160',
//             createTime: '2024-09-30 17:00:00',
//             src: 'www.baidu.com'
//           },
//           {
//             id: '2',
//             name: '计算机设计大赛获奖名单',
//             documentType: 'DOCX',
//             documentSize: 110,
//             libraryId: '1813178945621852161',
//             createTime: '2024-09-30 17:00:00',
//             src: 'www.baidu.com'
//           },
//           {
//             id: '3',
//             name: '软件资料',
//             documentType: 'PDF',
//             documentSize: 76,
//             libraryId: '1813178945621852160',
//             createTime: '2024-09-30 17:00:00',
//             src: 'www.baidu.com'
//           },
//           {
//             id: '4',
//             name: '学习资料',
//             documentType: 'TXT',
//             documentSize: 110,
//             libraryId: '1813178945621852161',
//             createTime: '2024-09-30 17:00:00',
//             src: 'www.baidu.com'
//           },
//           {
//             id: '5',
//             name: '演示ppt',
//             documentType: 'PPT',
//             documentSize: 23,
//             libraryId: '1813178945621852162',
//             createTime: '2024-09-30 17:00:00',
//             src: 'www.baidu.com'
//           },
//           {
//             id: '6',
//             name: '结题资料',
//             documentType: 'PDF',
//             documentSize: 57,
//             libraryId: '1813178945621852162',
//             createTime: '2024-09-30 17:00:00',
//             src: 'www.baidu.com'
//           },
//           {
//             id: '7',
//             name: '高等数学资料',
//             documentType: 'PDF',
//             documentSize: 50,
//             libraryId: '1813178945621852161',
//             createTime: '2024-09-30 17:00:00',
//             src: 'www.baidu.com'
//           },
//           {
//             id: '8',
//             name: 'Github资料',
//             documentType: 'TXT',
//             documentSize: 180,
//             libraryId: '1813178945621852162',
//             createTime: '2024-09-30 17:00:00',
//             src: 'www.baidu.com'
//           },

//         ],
//         total: 8,
//       })
//     })
//   },
// })
