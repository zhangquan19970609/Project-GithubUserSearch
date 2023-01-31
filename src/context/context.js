import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';
  // - [Get User](https://api.github.com/users/wesbos)
  // - [Repos](https://api.github.com/users/john-smilga/repos?per_page=100)
  // - [Followers](https://api.github.com/users/john-smilga/followers)
  // - [Rate Limit](https://api.github.com/rate_limit)

const GithubContext = React.createContext(); // 创建 context;

const GithubProvider = ({children}) => { // 建立 Provider 并 return provider component
    // 将 3 个 mock data 注入到 useState 中
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);

    // 设定 request rate 和 error
    const [requests, setRequests] = useState(0); // 已经 request 的数量

    // error state 及类型
    const [error, setError] = useState({show: false, msg:''});

    // Loading state：一开始设置为 true 用于测试
        // 并且让 Search Button 在 loading 阶段不显示
        // {requests > 0 && !isLoading && <button type='submit'>search</button>}
    const [isLoading, setIsLoading] = useState(false);

    // search 功能：在 context 中 define 后，直接在 search 中调用！
    const searchGithubUser = async (user) => {
        setIsLoading(true);

        // 在每次 search 时，清除上一次可能残留的 Error 提示
        // 这也是对 toggleError 进行 default parameter 设置的原因！
        // function toggleError(show=false,msg='') { 
        //    setError({show, msg});
        // }
        toggleError();

        console.log(user);
        const response = await axios(`${rootUrl}/users/${user}`)
        // 如果不确定会返回一个 response.data，则不能使用 .then
        // 但计算 rate limit 时一定会返回一个 object，此时可以直接用 .then 展开操作。
            .catch((err) => {
                console.log(err)
            })
        if(response){
            // console.log(response);
            setGithubUser(response.data);
            // 仅当 user data 存在时，才跟进 Repos 和 Followers
                // - [Repos](https://api.github.com/users/john-smilga/repos?per_page=100)
                // - [Followers](https://api.github.com/users/john-smilga/followers)
            const {login} = response.data;
                // await axios(`${rootUrl}/users/${login}/repos?per_page=100`)
                // .then((response) => setRepos(response.data))
                
                // await axios(`${rootUrl}/users/${login}/followers`)
                // .then((response) => setFollowers(response.data))
            
            // 以上的 plain fetch 有一个问题：各部分不是同时加载出来的。
            // 与其多次使用 await，(速度较慢) 也可使用 Promise.allSettled()

            await Promise.allSettled([
                await axios(`${rootUrl}/users/${login}/repos?per_page=100`),
                await axios(`${rootUrl}/users/${login}/followers`)
            ]).then((response) => {
                console.log(response); 
            // 此处返回一个 2 个 object 的 array，分别是 repos 和 followers.
                // 两个 object 又分别包含： 
                // status (fulfilled 与否，若 url 错误则 Rejected, 或直接 404)
                // 和 values（包含 data array）

// (2) [{…}, {…}]
// 0: 
// status: 
// "fulfilled"
// value: 
// {data: Array(2), status: 200, statusText: '', headers: AxiosHeaders, config: {…}, …}

// 1:
// status: 
// "fulfilled"
// value: 
// {data: Array(0), status: 200, statusText: '', headers: AxiosHeaders, config: {…}, …}
                
                const [repos, followers] = response;
                // 若 url 采用正确的格式且确实返回了内容，则 status code 应为 'fulfilled'
                const status = 'fulfilled';
                if (repos.status === status) {
                    setRepos(repos.value.data)
                }
                if (followers.status === status) {
                    setFollowers(followers.value.data)
                }
                });

        } else {
            toggleError(true, 'There Is No User With That Username')
        }
        // 由于更新 searchUser 不触发 页面的 reload，
        // 由此也不触发 useEffect，这样就无法 checkRequests 余额。

        // 因此在 Dashboard reload 的时候，check 一下 request 余额
        checkRequests();

        setIsLoading(false);
    }


    // check rate
    const checkRequests = () => {
        axios(`${rootUrl}/rate_limit`)
            .then(({data}) => { // 可以在这一步进行 destructure
                let {
                    rate: {remaining}
                } = data;
                // 设置好 requests 后，多次使用 api 调用某个 user 的数据，
                // 会发现 requests  remaining 次数减少！
                
                // 用于测试 Error 是否跟随 remaining 变动。
                // <button> 的显示与否，key index 是 requests，
                // 实际操作中 Error 也是根据 requests 的 value 变动。 
                // remaining = 0
                setRequests(remaining);
                if (remaining === 0) { // 当 remaining 为 0 时，则隐藏 button！
                    // throw error: request 次数用完了！
                    toggleError(true, 'sorry, you have exceeded your hourly rate limit!')

                }
            })
            .catch((err) => console.log(err))
        // 或也可采用 async + await 的方式，单独命名变量
        // const response = await axios(`${rootUrl}/rate_limit`).catch((err) => console.log(err))
        // console.log(response);
    }

    useEffect(checkRequests,[])
    // 设置一个 toggleError function，根据不同的 error 类型，对页面执行不同的显示。
        // show 和 msg 设置一个 默认值，方便实现 toggle 功能，
        // 在 show=true，随后发生变动，Error 不再显示的情况下，
        // 将 error 的 show 调整为 false.
        
        // 需要 toggle back to false 时候的 invoke 方式: (不再需要 parameters)
        // toggleError();
    const toggleError= (show=false,msg='') => { 
        setError({show, msg});
    }

    return <GithubContext.Provider value={{
        githubUser, 
        repos, 
        followers, 
        requests, 
        error,
        isLoading,
        searchGithubUser}}>{children}</GithubContext.Provider>
}

// 此处的输出，既可以使用 useGlobalContext，也可以直接使用 React.useContext
export const useGlobalContext = () => {
    return React.useContext(GithubContext)
}

export { GithubContext, GithubProvider }
