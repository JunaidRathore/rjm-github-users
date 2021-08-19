import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

 const GithubContext = React.createContext()

 const GithubProvider = ({children})=>{
 	const [value,setValue] = useState('')
 	const [githubUser,setGithubUser] = useState(mockUser)
 	const [repos,setRepos] = useState(mockRepos)
 	const [followers,setFollowers] = useState(mockFollowers)
 	const [remaining,setRemaining] = useState('0')
 	const [total,setTotal] = useState('60')
 	const [loading, setLoading] = useState(false)
 	const [error,setError] = useState(false)
 	const [msg,setMsg] = useState('ddd')
 	const changeValue = (e)=>{
 		setValue(e.target.value)
 	}
 	const fethUser = async()=>{
 		setLoading(true)
 		await axios(`${rootUrl}/users/${value}`).then(res=>{
 			console.log(res.status)
 			if(res.status === 200){
 				setGithubUser(res.data)
 			}else{
 				setError(true)
 				setMsg('There Is No User With That Username')
 			}
 		}).catch(err=>console.log(err))

 		await axios(`${rootUrl}/users/${value}/followers?per_page=100`).then(res=>{
 			console.log(res.status)
 			if(res.status === 200){
 				setFollowers(res.data)
 			}else{
 				setError(true)
 				setMsg('There Is No User With That Username')
 			}
 		}).catch(err=>console.log(err))

 		await axios(`${rootUrl}/users/${value}/repos?per_page=100`).then(res=>{
 			console.log(res.status)
 			if(res.status === 200){
 				setRepos(res.data)
 			}else{
 				
 			}
 		}).catch(err=>{console.log(err)
 		setError(true)
 				setMsg('There Is No User With That Username')})
 		setLoading(false)
 	}
 	const handleSubmit = (e)=>{
 		
 		setError(false)
		e.preventDefault()
 		if(value !== '')
 		{
	 		fethUser()
 		}
 	}
 	const fetchLimit  = async()=>{
 		setLoading(true)
 		 const url = `${rootUrl}/rate_limit`
 		const res = await fetch(url)
 		const root = await res.json()
 		console.log(root.rate.remaining)
 		const {remaining} = root.resources.core
 		const {limit} = root.resources.core
 		setRemaining(remaining)
 		setTotal(limit)
 		if(root.rate.remaining === 0){
 			console.log(limit)
 			setError(true)
 			setMsg("Sorry, you/'ve exceeded your hourly search limit")
 		}
 		setLoading(false)
 	}
 	useEffect(()=>{
 		// fethUser()
 	},[])
 	useEffect(()=>{
 		fetchLimit()

 	},[repos])	
 	return <GithubContext.Provider value={{
 		githubUser,repos,followers,value,changeValue,handleSubmit,remaining,total,loading,error,msg
 	}}>{children}</GithubContext.Provider>
 }
 export {GithubContext, GithubProvider}