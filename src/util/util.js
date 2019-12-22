import map from 'lodash/map'; 
import keys from 'lodash/keys'; 
import size from 'lodash/size'; 

export const formatData = (data) => {
  const keyList = keys(data)
  const keySize = size(keyList)

  return map(Array(10), (_, id) => {
    const objectKey = keyList[id % keySize];
    return ({ ...data[objectKey], id })
  })
}