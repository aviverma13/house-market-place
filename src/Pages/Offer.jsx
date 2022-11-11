import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "../Components/Spinner";
import { toast } from "react-toastify";
import ListingItem from "../Components/ListingItem";

function Offer() {
  const [listings, setListings] = useState(null);
  const [lastFetchedListings, setLastFetchedListings] = useState("");
  const [loading, setLoading] = useState(true);
  // const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get reference
        const listingRef = collection(db, "listings");

        //create a query
        const q = query(
          listingRef,
          where("offers", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        //Execute Query
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListings(lastVisible);

        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not  fetch listings");
      }
    };
    fetchListings();
  }, []);

  //

  //Pagination /Load More

  //
  const OnFetchMoreListings = async () => {
    try {
      //Get reference
      const listingRef = collection(db, "listings");

      //create a query
      const q = query(
        listingRef,
        where("offers", "==", true),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListings),
        limit(5)
      );

      //Execute Query
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListings(lastVisible);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings((prev) => [...prev, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not  fetch listings");
    }
  };

  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
      </header>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>
          <br />
          <br />
          {lastFetchedListings && (
            <p className="loadMore" onClick={OnFetchMoreListings}>
              {" "}
              Load More
            </p>
          )}
        </>
      ) : (
        <p>There are no current offers {params.categoryName}</p>
      )}
    </div>
  );
}

export default Offer;
