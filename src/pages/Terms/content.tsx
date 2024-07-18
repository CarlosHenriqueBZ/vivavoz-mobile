import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {
  PageContent,
  ContentContainer,
  BoxTerms,
  Title,
} from './styles';

const ContentTerms: React.FC = () => {
  return (
        <PageContent>
          <Title>Termos de Uso</Title>
          <ContentContainer>
            <BoxTerms>
              <View style={styles.container}>
                <Text style={styles.paragraph}>
                  Os serviços do aplicativo são fornecidos pela Rede Suco de
                  Laranja e pela Rede Vidaviva, consórcio sindical das entidades
                  que aderem a este aplicativo, titular da propriedade
                  intelectual sobre software, aplicativos, conteúdos e demais
                  ativos relacionados à plataforma VivaVoz enquanto permanecer
                  membro destas redes.
                </Text>
                <Text style={styles.listItem}>1. Do objeto</Text>
                <Text style={styles.paragraph}>
                  A plataforma visa licenciar o uso de seu software, website,
                  aplicativos e demais ativos de propriedade intelectual,
                  fornecendo ferramentas para auxiliar e dinamizar o dia-a-dia
                  dos seus usuários. Com o objetivo facilitar o acesso à
                  comunicação e oferecimento de reclamações junto às entidades
                  sindicas, o Consórcio da Rede Suco de Laranja e daRede
                  Vidaviva, através de seus sindicatos membros, disponibiliza
                  gratuitamente o aplicativo VivaVoz, que permite acesso ao
                  conteúdo do aplicativo. A plataforma caracteriza-se pela
                  prestação do seguinte serviço:
                </Text>
                <Text style={styles.letterItem}>
                  . envio de relatos sobre problemas nos locais de trabalho
                </Text>
                <Text style={styles.letterItem}>. plataforma de notícias</Text>
                <Text style={styles.letterItem}>. realização de pesquisa.</Text>
                <Text style={styles.letterItem}>. realizar sindicalização.</Text>
                <Text style={styles.letterItem}>
                  . oferecer convênios ao associados das entidades que aderem a
                  este aplicativo.
                </Text>
                <Text style={styles.letterItem}>2. Da aceitação</Text>
                <Text style={styles.paragraph}>
                  O presente Termo estabelece obrigações contratadas de livre e
                  espontânea vontade, por tempo indeterminado, entre a
                  plataforma e as pessoas físicas e/ou jurídicas, usuárias do
                  aplicativo. Ao utilizar a plataforma, o usuário aceita
                  integralmente as presentes normas e compromete-se a
                  observá-las, sob o risco de aplicação das penalidades cabíveis
                  juridicamente. A aceitação do presente instrumento é
                  imprescindível para o acesso e para a utilização de quaisquer
                  serviços fornecidos. Caso não concorde com as disposições
                  deste instrumento, o usuário não deve utilizá-los.
                </Text>
                <Text style={styles.listItem}>3. Do acesso dos usuários</Text>
                <Text style={styles.paragraph}>
                  Serão utilizadas todas as soluções técnicas à disposição do
                  responsável pela plataforma para permitir o acesso ao serviço
                  24 (vinte e quatro) horas por dia, 7 (sete) dias por semana.
                  No entanto, a navegação na plataforma ou em alguma de suas
                  páginas poderá ser interrompida, limitada ou suspensa para
                  atualizações, modificações ou qualquer ação necessária ao seu
                  bom funcionamento.
                </Text>
                <Text style={styles.listItem}>4. Do cadastro</Text>
                <Text style={styles.paragraph}>
                  O acesso às funcionalidades da plataforma (Notícias,
                  convênios, solicitações de sindicalização) exigirá a
                  realização de um cadastro prévio, exceção apenas em caso de
                  denúncias anônimas. Ao se cadastrar, o usuário deverá informar
                  dados completos, recentes e válidos, sendo de sua exclusiva
                  responsabilidade manter referidos dados atualizados, bem como
                  o usuário se compromete com a veracidade dos dados fornecidos.
                  O usuário se compromete a não informar seus dados cadastrais
                  e/ou de acesso à plataforma a terceiros, responsabilizando-se
                  integralmente pelo uso que deles seja feito. Mediante a
                  realização do cadastro, o usuário declara e garante
                  expressamente ser plenamente capaz, podendo exercer e usufruir
                  livremente dos serviços e produtos.
                </Text>
                <Text style={styles.paragraphRed}>
                  O usuário que se cadastrar deverá fornecer um endereço de
                  e-mail válido, bem como um número telefônico, através do qual
                  será realizada todas comunicações necessárias.
                </Text>
                <Text style={styles.paragraph}>
                  Após a confirmação do cadastro, o usuário possuirá um login e
                  uma senha pessoal, que assegura seu acesso ao aplicativo.
                  Desta forma, compete ao usuário exclusivamente a manutenção de
                  referida senha de maneira confidencial e segura. O usuário
                  poderá, a qualquer tempo, requerer o cancelamento de seu
                  cadastro junto à plataforma.
                </Text>
                <Text style={styles.paragraphRed}>
                  O usuário, ao aceitar os Termos e Política de Privacidade,
                  autoriza expressamente a plataforma deste aplicativo a
                  coletar, armazenar, e tratar, as informações derivadas do uso
                  dos serviços, incluindo todas as informações preenchidas pelo
                  usuário no momento em que realizar ou atualizar seu cadastro,
                  além de outras expressamente descritas na Política de
                  Privacidade que deverá ser autorizada pelo usuário. Os dados
                  de cada usuário serão direcionados ao sindicato de sua
                  respectiva categoria indicado no ato do cadastramento sendo a
                  organização sindical escolhida guardiã destes dados.
                </Text>
                <Text style={styles.paragraph}>
                  Para acessar a função “Relatar um problema” não será
                  necessário realizar cadastro. Esta função é apenas SE e
                  somente SE o usuário quiser acessar as demais funções que o
                  aplicativo oferece. Informamos ainda que sempre ao fazer
                  denúncias em “relatar um problema” o anonimato é mantido,
                  mesmo que seja um usuário cadastrado.
                </Text>
                <Text style={styles.listItem}>5. Dos serviços ou produtos</Text>
                <Text style={styles.paragraph}>
                  A plataforma poderá disponibilizar para o usuário um conjunto
                  específico de funcionalidades e ferramentas para otimizar o
                  uso dos serviços e produtos.
                </Text>
                <Text style={styles.listItem}>6. Política de Privacidade</Text>
                <Text style={styles.paragraph}>
                  Esta Política de Privacidade foi elaborada em conformidade com
                  a Lei Federal n. 12.965 de 23 de abril de 2014 (Marco Civil da
                  Internet), A Lei 13.709/18, Lei Geral de Proteção de Dados
                  (“LGPD”), Esta Política de Privacidade poderá ser atualizada
                  em decorrência de eventual atualização normativa, razão pela
                  qual se convida o usuário a consultar periodicamente esta
                  seção. Tratamos os seus dados apenas para finalidades
                  legítimas, específicas e determinadas. Não realizaremos
                  quaisquer atividades de tratamento de dados pessoais caso não
                  tenhamos uma finalidade legítima, específica e determinada
                  para tal.
                </Text>
                <Text style={styles.listItem}>7. Do suporte</Text>
                <Text style={styles.paragraph}>
                  Em caso de qualquer dúvida, sugestão ou problema com a
                  utilização da plataforma, o usuário poderá entrar em contato
                  com o suporte, através do e- mail redesucodelaranja@gmail.com.
                  Estes serviços de atendimento ao usuário estarão disponíveis
                  nos seguintes dias e horários: segunda a sexta de 9h00 às
                  17h00.
                </Text>
                <Text style={styles.listItem}>8. Das responsabilidades</Text>
                <Text style={styles.paragraph}>
                  É de responsabilidade do usuário: a) defeitos ou vícios
                  técnicos originados no próprio sistema do usuário; b) a
                  correta utilização da plataforma, dos serviços ou produtos
                  oferecidos, prezando pela boa convivência, pelo respeito e
                  cordialidade entre os usuários; c) pelo cumprimento e respeito
                  ao conjunto de regras disposto nesse Termo de Condições Geral
                  de Uso, na respectiva Política de Privacidade e na legislação
                  nacional e internacional; d) pela proteção aos dados de acesso
                  à sua conta/perfil (login e senha). O Usuário é responsável
                  pela reparação de todos e quaisquer danos, diretos ou
                  indiretos (inclusive decorrentes de violação de quaisquer
                  direitos de outros usuários, de terceiros, inclusive direitos
                  de propriedade intelectual, de sigilo e de personalidade), que
                  sejam causados ao Consorcio, a qualquer outro Usuário, ou,
                  ainda, a qualquer terceiro, inclusive em virtude do
                  descumprimento do disposto nestes Termos de Uso e Política de
                  Privacidade ou de qualquer ato praticado a partir da
                  utilização do serviço. O usuário declara, reconhece e aceita
                  que: o APLICATIVO, o PROGRAMA/SISTEMA, não foi desenvolvido
                  sob encomenda do usuário, mas para uso genérico, razão pela
                  qual não pode garantir que o bem atenderá as necessidades
                  específicas do usuário; as configurações de seus dispositivos
                  e servidores estão de acordo com os requisitos mínimos
                  necessários para a instalação e utilização do
                  PROGRAMA/SISTEMA. É de responsabilidade da plataforma VivaVoz:
                  
                </Text>
                <Text style={styles.letterItem}>
                    a) indicar as características do serviço ou produto;
                  </Text>
                  <Text style={styles.letterItem}>
                    b) os defeitos e vícios encontrados no serviço ou produto
                    oferecido desde que lhe tenha dado causa;
                  </Text>
                  <Text style={styles.letterItem}>
                    c) as informações que forem por ele divulgadas, sendo que os
                    comentários ou informações divulgadas por usuários são de
                    inteira responsabilidade dos próprios usuários;
                  </Text>
                  <Text style={styles.letterItem}>
                    d) os conteúdos ou atividades ilícitas praticadas através da
                    sua Plataforma: A plataforma não se responsabiliza por links
                    externos contidos em seu sistema que possam redirecionar o
                    usuário à ambiente externo à sua rede. Não poderão ser
                    incluídos links externos ou páginas que sirvam para fins
                    comerciais ou publicitários ou quaisquer informações
                    ilícitas, violentas, polêmicas, pornográficas, xenofóbicas,
                    discriminatórias ou ofensivas.
                  </Text>
                <Text style={styles.listItem}>9. Dos direitos autorais</Text>
                <Text style={styles.paragraph}>
                  O presente Termo de Uso concede aos usuários uma licença não
                  exclusiva, não transferível e não sublicenciável, para acessar
                  e fazer uso da plataforma e dos serviços e produtos por ela
                  disponibilizados. A estrutura do aplicativo, as marcas,
                  logotipos, nomes comerciais, layouts, gráficos e design de
                  interface, imagens, ilustrações, fotografias, apresentações,
                  vídeos, conteúdos escritos e de som e áudio, programas de
                  computador, banco de dados, arquivos de transmissão e
                  quaisquer outras informações e direitos de propriedade
                  intelectual da razão social , observados os termos da Lei da
                  Propriedade Industrial (Lei nº 9.279/96), Lei de Direitos
                  Autorais (Lei nº 9.610/98) e Lei do Software (Lei nº
                  9.609/98), estão devidamente reservados. Este Termo de Uso não
                  cede ou transfere ao usuário qualquer direito, de modo que o
                  acesso não gera qualquer direito de propriedade intelectual ao
                  usuário, exceto pela licença de utilização limitada ora
                  concedida. O uso da plataforma pelo usuário é pessoal,
                  individual e intransferível, sendo vedado qualquer uso não
                  autorizado, comercial ou não-comercial. Tais usos consistirão
                  em violação dos direitos de propriedade intelectual da Rede
                  Suco de Laranja, puníveis nos termos da legislação aplicável.
                  Em nenhuma hipótese, o Consorcio será responsável pela
                  instalação no equipamento do Usuário ou de terceiros, de
                  códigos maliciosos (vírus, trojans, malware, worm, bot,
                  backdoor, spyware, rootkit, ou de quaisquer outros que venham
                  a ser criados), em decorrência da navegação na Internet pelo
                  usuário. Em hipótese alguma, o serviço e seus colaboradores
                  responsabilizam-se por eventuais danos diretos, indiretos,
                  emergentes, especiais, imprevistos ou multas causadas, em
                  qualquer matéria de responsabilidade, seja contratual,
                  objetiva ou civil (inclusive negligência ou outras),
                  decorrentes de qualquer forma de uso do serviço, mesmo que
                  advertida a possibilidade de tais danos. O usuário concorda
                  que não usará robôs, sistemas de varredura e armazenamento de
                  dados (como “spiders” ou “scrapers”), links escondidos ou
                  qualquer outro recurso escuso, ferramenta, programa, algoritmo
                  ou método coletor/extrator de dados automático para acessar,
                  adquirir, copiar ou monitorar o serviço, sem permissão
                  expressa por escrito do órgão. Em se tratando de aplicativos
                  em dispositivos móveis sua comercialização é expressamente
                  proibida. Ao concordar com este Termo de Uso e utilizar o
                  aplicativo móvel, o usuário receberá uma permissão para uso
                  não comercial dos serviços oferecidos pelo aplicativo, o que,
                  em nenhuma hipótese, fará dele proprietário do aplicativo
                  móvel.
                </Text>
                <Text style={styles.listItem}>10. Das sanções</Text>
                <Text style={styles.paragraph}>
                  Sem prejuízo das demais medidas legais cabíveis, a Rede Suco
                  de Laranja poderá, a qualquer momento, advertir, suspender ou
                  cancelar a conta do usuário: a) que violar qualquer
                  dispositivo do presente Termo; b) que descumprir os seus
                  deveres de usuário; c) que tiver qualquer comportamento
                  fraudulento, doloso ou que ofenda a terceiros.
                </Text>
                <Text style={styles.listItem}>11. Da rescisão</Text>
                <Text style={styles.paragraph}>
                  A não observância das obrigações pactuadas neste Termo de Uso
                  ou da legislação aplicável poderá, sem prévio aviso, ensejar a
                  imediata rescisão unilateral e o bloqueio de todos os serviços
                  prestados ao usuário.
                </Text>
                <Text style={styles.listItem}>12. Das alterações</Text>
                <Text style={styles.paragraph}>
                  Os itens descritos no presente instrumento poderão sofrer
                  alterações, unilateralmente e a qualquer tempo, para adequar
                  ou modificar os serviços, bem como para atender novas
                  exigências legais. As alterações serão veiculadas pelo
                  aplicativo VivaVoz e o usuário poderá optar por aceitar o novo
                  conteúdo ou por cancelar o uso dos serviços.
                </Text>
                <Text style={styles.listItem}>13. Do foro</Text>
                <Text style={styles.paragraph}>
                  Para a solução de controvérsias decorrentes do presente
                  instrumento será aplicado integralmente o Direito brasileiro.
                  Os eventuais litígios deverão ser apresentados no foro da
                  comarca definida entre as partes.
                </Text>
              </View>
            </BoxTerms>
          </ContentContainer>
        </PageContent>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  paragraph: {
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 24,
  },
  paragraphRed: {
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 24,
    color: '#ff1b0a',
  },
  listItem: {
    marginLeft: 20,
    fontSize: 24,
    fontWeight: 'bolder',
    lineHeight: 40,
  },
  letterItem: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    margin: 10,
  },
});

export default ContentTerms;
