import Container from 'components/Container/Container';
import NewReleases from './NewReleases';
import Trending from './Trending';

function HomePage() {
  return (
    <Container>
      <NewReleases />
      <Trending />
    </Container>
  );
}

export default HomePage;
