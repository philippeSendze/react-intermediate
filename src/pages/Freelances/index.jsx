import { useState, useEffect } from 'react'
import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'

const CardsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
`

const PageTitle = styled.h1`
  font-size: 30px;
  color: black;
  text-align: center;
  padding-bottom: 30px;
`

const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
`

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
`

function Freelances() {
  const [isDataLoading, setDataLoading] = useState(false)
  const [freelanceProfiles, setFreelanceProfiles] = useState([])

  useEffect(() => {
    setDataLoading(true)
    fetch(`http://localhost:8000/freelances`).then((response) =>
      response.json().then(({ freelancersList }) => {
        setFreelanceProfiles(freelancersList)
        console.log(freelanceProfiles)
        setDataLoading(false)
      })
    )
  }, [])

  return (
    <div>
      <PageTitle>Trouvez votre prestataire</PageTitle>
      <PageSubtitle>
        Chez Shiny nous réunissons les meilleurs profils pour vous.
      </PageSubtitle>

      {isDataLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <CardsContainer>
          {freelanceProfiles.map((profile, index) => (
            <Card
              key={`${profile.name}-${index}`}
              label={profile.job}
              title={profile.name}
            />
          ))}
        </CardsContainer>
      )}
    </div>
  )
}

export default Freelances
