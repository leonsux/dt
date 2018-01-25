import React, { Component } from 'react'
import {Link} from 'react-router'

class AppCategory extends Component {
  render () {
    return (
      <div>
        <section id="content">
          <section className="list-category-6"> 
            <table> 
              <tbody> 
                <tr className="ll"> 
                  <td> 
                    <Link> 
                      <span className="i lpg"></span> 良品购 
                    </Link> 
                    <div className="border"></div> 
                  </td> 
                  <td> 
                    <a> 
                      <span className="i tmh"></span> 商店 
                    </a> 
                  </td> 
                </tr> 
                <tr className="xxl"> 
                  <td className="c1"> 
                    <div className="border"></div>                     
                      <a><span></span>美食菜谱</a>
                      <br/>                    
                      <a><span></span>家居生活</a>
                      <br/>                     
                    <a><span></span>影音书</a>                                       
                  </td> 
                  <td className="c2">                
                    <a><span></span>壁纸</a>
                    <br/>                     
                    <a><span></span>头像</a>
                    <br/>                     
                    <a><span></span>表情</a>                                      
                  </td> 
                </tr> 
                <tr className="xxl"> 
                  <td className="c3"> 
                    <div className="border"></div>                   
                    <a><span></span>时尚搭配</a>
                    <br/>                     
                    <a><span></span>美容美妆</a>
                    <br/>                    
                    <a><span></span>美发造型</a>                                        
                  </td> 
                  <td className="c4">               
                    <a><span></span>文字句子</a>
                    <br/>                     
                    <a><span></span>手工DIY</a>
                    <br/>                     
                    <a><span></span>插画绘画</a>                                        
                  </td> 
                </tr> 
                <tr className="xxl"> 
                  <td className="c5"> 
                    <div className="border"></div>              
                    <a><span></span>婚纱婚礼</a>
                    <br/>                     
                    <a><span></span>旅行</a>
                    <br/>         
                    <a><span></span>摄影</a>              
                  </td> 
                  <td className="c6">      
                    <a><span></span>人物明星</a>
                    <br/>                     
                    <a><span></span>动画漫画</a>
                    <br/>          
                    <a><span></span>搞笑萌宠</a>          
                  </td> 
                </tr> 
              </tbody> 
            </table> 
          </section>
        </section>
      </div>
    )
  }
}

export default AppCategory