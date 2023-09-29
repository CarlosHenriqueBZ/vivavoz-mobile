import React from  'react';

import {
  UnionizationStatus,
  TextContent,
} from './styles';

interface IProps{
  worker: any;
}

const IsSyndycateApprovedWaiting: React.FC<IProps> = ({worker})=>{
  return (
    <UnionizationStatus>
      <TextContent>{`A sua solicitação para se sindicalizar no ${worker.syndicate.nome_fantasia} está em análise. Você deverá ter um retorno em breve.`}</TextContent>
    </UnionizationStatus>
  )
}

export default IsSyndycateApprovedWaiting;
